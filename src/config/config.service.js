const redisStore = require('../store/redis.store');
const policyRepository = require('../api/repositories/policy.repository');

class ConfigService {
    async getPolicy(plan) {
        const key = `policy:${plan}`;

        const cachedPolicy = await redisStore.get(key);

        if(cachedPolicy) {
            return JSON.parse(cachedPolicy);
        }

        const policy = await policyRepository.findByPlan(plan);
        if(!policy){
            return null;
        }
        await redisStore.set(key, JSON.stringify(policy));

        return policy;
    }

    async setPolicy(plan, policy){
        await redisStore.set(
            `policy:${plan}`,
            JSON.stringify(policy)
        );
        return policy 
    }
}

module.exports = new ConfigService();