const publisher = require("../realtime/event.publisher");
const algorithms = require('../algorithms');
const configService = require('../config/config.service');
const store = require("../store/redis.store");
const perUserPolicy = require("../policies/perUser.policy");
const { buildKey } = require("../utils/keyBuilder");

class RateLimiterEngine{
    async check( req ){
        // 1. USER LEVEL CHECK
        const userResult = await this.runCheck(req, "user");
        if(!userResult.allowed) {
            return userResult;
        }

        // 2. API KEY LEVEL CHECK
        const apiResult = await this.runCheck(req, "apiKey");
        if(!apiResult.allowed) {
            return apiResult;
        }
        return userResult;
    }


    async runCheck( req, scope ){
        let identifier;
        if (scope === "user") {
            identifier = req.headers["x-user-id"];
            if (!identifier) throw new Error("Missing user id");
        }
        else if (scope === "apiKey") {
            identifier = req.headers["x-api-key"] || "default";
        }

        console.log("ENGINE:", { scope, identifier });

        const apiKey = req.headers["x-api-key"] || "default";   
        const endpoint = req.headers["x-endpoint"] || "global"; 
        

        const key = buildKey({
            scope,
            apiKey: req.headers["x-api-key"] || "default",
            endpoint: req.headers["x-endpoint"] || "global",
            identifier
        })

        const config = await configService.getConfig({
            apiKey,
            endpoint,
            scope
        });

        const { limit, window, algorithm } = config;

        if (!limit || !window || !algorithm) {
            throw new Error("Invalid config");
          }

          console.log("ENGINE KEY:", key);

        //executing algorihtm 
        const result = await algorithms.execute({
            algorithm,
            key,
            limit,
            window
        });

        publisher.publish("rate_limit_event", {
            scope,
            identifier,
            allowed: result.allowed,
            remaining: result.remaining,
            timeStamp: Date.now(),
        })

        // normalize response
        return result;
    }
}

module.exports = new RateLimiterEngine();