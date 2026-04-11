const redis = require('../store/redis.store');

class ConfigService {
    async getConfig({apiKey, endpoint, scope}) {
        const redisKey = `config:rate_limit:${scope}:${apiKey}:${endpoint}`;

        const config = await redis.get(redisKey);

        if(!config) {
            // fallback to default config
            return {
                limit: 5,
                window: 60,
                algorithm: "sliding-window"
            };
        }
        return JSON.parse(config);
    }

    async setConfig(key, value){
        await redis.set(`config:${key}`, JSON.stringify(value));
    }
}

module.exports = new ConfigService();