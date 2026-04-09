const engine = require("../src/core/rateLimiter.engine");

(async () => {
    console.log("Starting load test...\n");
    for (let i = 0; i < 10; i++){
        const res = await engine.check({
            key: "user:1",
        });
        console.log(`Request ${i + 1}:`, res);
    }

    process.exit(0);
})();