const engine = require("../../../core/rateLimiter.engine");

async function routes(fastify, options) {
  fastify.post("/check", async (req, reply) => {
    try {
      const result = await engine.check( req );
      return result;
    } catch (err) {
      reply.code(400);
      return { error: err.message };
    }
  });
}

module.exports = routes;