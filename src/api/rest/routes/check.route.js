const { check } = require('../../../core/rateLimiter.engine');

async function checkRoute(req, reply) {
  const { apiKey, route, identifier } = req.body;

  const result = await check({ apiKey, route, identifier });

  return reply.send(result);
}

module.exports = checkRoute;