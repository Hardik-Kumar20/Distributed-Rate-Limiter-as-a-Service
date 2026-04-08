function buildKey({ apiKey, route, identifier }) {
    return `rate_limit:${apiKey}:${route}:${identifier}`;
  }
  
  module.exports = { buildKey };