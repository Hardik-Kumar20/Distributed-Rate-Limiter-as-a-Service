const crypto = require("crypto");

const rateLimiterEngine = require("../../core/rateLimiter.engine");
const api_keysrepositories = require("../repositories/api_keys.repositories");
const applicationRepo = require("../repositories/application.repository");
const metricsService = require("../../metrics/metrics.service");

module.exports = {
    async checkRateLimit(apiKey){
        const hash = crypto.createHash("sha256").update(apiKey).digest("hex");

        const storedKey = await api_keysrepositories.findByHash(hash);

        if(!storedKey){
            throw new Error("Invalid API key");
        }

        await api_keysrepositories.updateLastUsed(storedKey.id);
        
        const application = await applicationRepo.findById(storedKey.application_id);

        if(!application){
            throw new Error("Application not found");
        }

        const decision = await rateLimiterEngine.checkLimit({
            key: application.id,
            plan: application.plan
        });

        metricsService.record({
            applicationId: application.id,
            apiKeyId: storedKey.id,
            allowed: decision.allowed
        });

        return decision;
    }
}