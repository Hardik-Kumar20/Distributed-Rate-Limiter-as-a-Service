const { execScript } = require('../algorithms');
const { buildKey } = require('../utils/keyBuilder');
const { now } = require('../utils/clock');
const { createDecision } = require('./decision.model');
const configService = require('../config/config.service');
const metrics = require('../metrics/metrics');


async function check({ apiKey, route, identifier}){
    const start = Date.now();

    const config = await configService.getConfig(apiKey);

    const key = buildKey(apiKey, route, identifier);

    let result;
    switch (config.algorithm) {
        case 'token_bucket' : {
            result = await execScript(
                'tokenBucket',
                [key],
                [
                    config.capacity,
                    config.refillRate,
                    now()
                ]
            );
            break;
        }

        case 'sliding_window' : {
            result = await execScript(
                'slidingWindow',
                [key],
                [
                    config.window,
                    config.limit,
                    now()
                ]
            );
            break;
        }

        default:
            throw new Error(`Unsupported algorithm: ${config.algorithm}`);
    }


    const allowed = result[0] === 1;
    const remaining = Math.floor(result[1] || 0);

    const decision = createDecision({
        allowed,
        remaining
    });

    metrics.reordRequest();
    if(!allowed) metrics.recordBlocked();

    const duration = Date.now() - start;
    metrics.recordLatency(duration);

    return decision;

}

module.exports = {
    check
};