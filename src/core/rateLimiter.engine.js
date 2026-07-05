const redisStore = require('../store/redis.store');
const configService = require('../config/config.service');

class RateLimiterEngine {
   async checkLimit({ key, plan }) {
    const now = Date.now();
    const policy = await configService.getPolicy(plan)
    if(!policy) {
        throw new Error(`No policy found for plan: ${plan}`);
    }
    let args = [];

    switch (policy.algorithm) {
        case "token-bucket":
            args = [
                now,
                policy.refillRate,
                policy.capacity,
            ];
            break;
        
        case "fixed-window":
            args = [
                now,
                policy.window,
                policy.limit
            ];
            break;
        
        case "sliding-window":
            args = [
                now,
                policy.window,
                policy.limit
            ]
            break;
        
        case "sliding-counter":
            args = [
                now,
                policy.window,
                policy.limit
            ]
            break;
        
        case "leaky-bucket":
            args = [
                now,
                policy.capacity,
                policy.leakRate
            ]
            break;
        
        default:
            throw new Error(`Unknown algorithm: ${policy.algorithm}`);
    }

    return redisStore.executeScript(
        policy.algorithm,
        [key],
        args
    );
   }
}


module.exports = new RateLimiterEngine();