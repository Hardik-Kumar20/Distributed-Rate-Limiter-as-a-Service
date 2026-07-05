const { ca } = require('zod/locales');
const policyRepository = require("../src/api/repositories/policy.repository");

async function seed() {
  try {
    await policyRepository.create({
      plan: "free",
      algorithm: "token-bucket",
      capacity: 20,
      refill_rate: 1,
      window: null,
      request_limit: null,
      leak_rate: null,
  });
    await policyRepository.create(
      {
        plan: "premium",
        algorithm: "fixed-window",
        capacity: null,
        refill_rate: null,
        window_size: 60000,
        request_limit: 100,
        leak_rate: null,
      }
    );

    await policyRepository.create({
      plan: "enterprise",
      algorithm: "leaky-bucket",
      capacity: 1000,
      refill_rate: null,
      window_size: null,
      request_limit: null,
      leak_rate: 10,
    });

    await policyRepository.create({
      plan: "enterprise-plus",
      algorithm: "sliding-window",
      capacity: null,
      refill_rate: null,
      window_size: 60000,
      request_limit: 50,
      leak_rate: null,
    })


    console.log("Policies seeded successfully");

    process.exit(0);
  }
  catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();