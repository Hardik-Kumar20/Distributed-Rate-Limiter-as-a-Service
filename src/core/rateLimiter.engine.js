const algorithms = require('./algorithms');
const configService = require('../services/config.service');
const store = require("../store/redis.store");

class RateLimiterEngine{
    async check({ key, limit, window, algorithm}){
        if(!key || !limit || !window || !algorithm){
            throw new Error('Invalid rate limiter params');
        }

        const config = await configService.getConfig(key);

        const { limit, window, algorithm } = config;


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