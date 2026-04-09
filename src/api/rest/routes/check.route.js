const engine = require("../../../core/rateLimiter.engine");
const perUserPolicy = require("../../../policies/perUser.policy");

async function routes(fastify, options) {
  fastify.post("/check", async (req, reply) => {
    try {
      const { key } = perUserPolicy(req);

      const result = await engine.check({ key });

      return result;
    } catch (err) {
      reply.code(400);
      return { error: err.message };
    }
  });
}

module.exports = routes;