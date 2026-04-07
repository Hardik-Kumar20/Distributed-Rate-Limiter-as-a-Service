const fs = require('fs');
const path = require('path');
const redis =  require('../store/redis.store');

const scripts = {};

async function loadScript(name, file){
    const script = fs.readFileSync(
        path.join(__dirname, file),
        'utf8'
    );

    const sha = await redis.script('LOAD', script);

    scripts[name] = {
        sha,
        script
    };
}

async function initScripts(){
    await loadScript('tokenBucket', 'tokenBucket.lua');
    await loadScript('slidingWindow', 'slidingWindow.lua');
}


async function execScript(name, keys = [], args = []){
    const { sha, script } = scripts[name];

    try {
        return await redis.evalsha(sha, keys.length, ...keys, ...args);
    } catch(err) {
        // fallback if script is not cached
        if(err.message.includes('NOSCRIPT')){
            return await redis.eval(script, keys.length, ...keys, ...args);
        }
        throw err;
    }
}

module.exports = {
    initScripts,
    execScript
};