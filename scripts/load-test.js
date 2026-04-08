const engine = require("../src/core/rateLimiter.engine");

(async () => {
    for (let i = 0; i < 10; i++){
        const res = await engine.check({
            key: "user:1",
            limit: 5,
            window: 10,
            algorithm: "sliding-window",
        });
        console.log(res);
    }
})