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

async function execute({ algorithm, key, limit, window }) {
    console.log("ALGO RECEIVED:", { algorithm, key });
    const now = Date.now();
    const sha = await loadScripts(algorithm);
  
    let result;
  
    if (algorithm === "sliding-window") {
      result = await redis.evalsha(
        sha,
        1,
        key,
        now,
        window * 1000,
        limit
      );
    }
  
    else if (algorithm === "token-bucket") {
      const rate = limit / (window * 1000); // tokens per ms

      console.log("TOKEN BUCKET USING KEY:", key);
  
      result = await redis.evalsha(
        sha,
        1,
        key,
        now,
        rate,
        limit
      );
    }
  
    else {
      throw new Error("Unknown algorithm");
    }
  
    return format(result);
  }
  

    function format(result) {
        return {
          allowed: result[0] === 1,
          remaining: result[1],
          resetTime: result[2],
        };
    }

module.exports = {
    execute
}