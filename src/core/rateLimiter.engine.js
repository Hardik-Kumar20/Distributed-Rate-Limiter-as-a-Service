const algorithms = require('../algorithms');
const configService = require('../config/config.service');
const store = require("../store/redis.store");

class RateLimiterEngine{
    async check({ key }){
        if(!key){
            throw new Error('Key is required');
        }

        const config = await configService.getConfig(key);

        const { limit, window, algorithm } = config;

        if (!limit || !window || !algorithm) {
            throw new Error("Invalid config");
          }

        //executing algorihtm 
        const result = await algorithms.execute({
            algorithm,
            key,
            limit,
            window,
            store
        });

        // normalize response
        return result;
    }
}

module.exports = new RateLimiterEngine();