const redis = require('../store/redis.store');

class ConfigService {
    async getConfig(key) {
        const config = await redis.get(`config:${key}`);

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