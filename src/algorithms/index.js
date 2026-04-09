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
    if (!scripts[name]) {
        throw new Error(`Script not found for algorithm: ${name}`);
      }
    if (!shaMap[name]){
        console.log("Loading script for:", name);

        shaMap[name] = await redis.script("load", scripts[name]);

        console.log("Loaded SHA:", shaMap[name]);
    }
    return shaMap[name];
}

async function execute({ algorithm, key, limit, window}){
    const now = Date.now();

    try{
    const sha = await loadScripts(algorithm);

    const result = await redis.evalsha(
        sha,
        1,
        key,
        now,
        window * 1000,
        limit
    );

    return format(result);
} catch (err) {
    if (err.message.includes("NOSCRIPT")) {
        console.log("⚠️ Reloading script...");
  
        const sha = await redis.script("load", scripts[algorithm]);
  
        const result = await redis.evalsha(
          sha,
          1,
          key,
          now,
          window * 1000,
          limit
        );
  
        return format(result);
      }
  
      throw err;
    }

    function format(result) {
        return {
          allowed: result[0] === 1,
          remaining: result[1],
          resetTime: result[2],
        };
    }
}

module.exports = {
    execute
}