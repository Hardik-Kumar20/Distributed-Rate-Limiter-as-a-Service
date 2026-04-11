const configService = require('../src/config/config.service');

(async() => {
const apiKey = "free";
const endPoint = "/login";

// User Level Config
await configService.setConfig(
    `rate_limit:user:${apiKey}:${endPoint}`,
    {
        limit: 3,
        window: 10,
        algorithm: "sliding-window"
    }
)


// API KEY LEVEL CONFIG
await configService.setConfig(
    `rate_limit:apiKey:${apiKey}:${endPoint}`,
    {
      limit: 10,
      window: 60,
      algorithm: "token-bucket",
    }
  );

  console.log("Configurations seeded successfully");
})()