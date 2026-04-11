function buildKey({scope, apiKey, route, identifier }) {
    return `rate_limit:${scope}:${apiKey}:${route}:${identifier}`;
  }
  
  module.exports = { buildKey };