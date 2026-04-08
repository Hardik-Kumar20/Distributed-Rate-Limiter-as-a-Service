const configService = require('../src/config/config.service');

(async() => {
    //per-user
    await configService.setConfig('user:1', {
        limit: 3,
        window: 10,
        algorithm: "sliding-window"
    });

    // per-apiKey
    await configService.setConfig("apikey:abc123", {
        limit: 10,
        window: 60,
        algorithm: "token-bucket"
    });

    console.log("Configurations seeded successfully");
})();