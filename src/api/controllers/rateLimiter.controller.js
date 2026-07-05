const rateLimiterEngine = require('../../core/rateLimiter.engine');

module.exports = {
    async checkRateLimit(key, plan){
        const result = await rateLimiterEngine.checkLimit({
            key,
            plan
        });
        return result;
    }
}