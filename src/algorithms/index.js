const fs = require("fs");
const path = require("path");
const redis = require('../store/redis.store');


const scripts = {
    "sliding-window": fs.readFileSync(
        path.join(__dirname, "slidingWindow.lua"),
        "utf-8"
    ),
    "token-bucket": fs.readFileSync(
        path.join(__dirname, "tokenBucket.lua"),
        "utf-8"
    ),
};

const shaMap = {};

async function loadScripts(name) {
    if (!shaMap[name]){
        shaMap[name] = await redis.script("LOAD", scripts[name]);
    }
    return
}

async function execute({ algorithm, key, limit, window}){
    const sha = await loadScripts(algorithm);

    const now = Date.now();

    const result = await redis.evalsha(
        sha,
        1,
        key,
        now,
        window * 1000,
        limit
    );

    return {
        allowed: result[0] === 1,
        remaining: result[1],
        resetTime: result[2]
    }
}

module.exports = {
    execute
}