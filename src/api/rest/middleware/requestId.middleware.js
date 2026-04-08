const { randomUUID } = require('crypto');

function requestIdMiddleware(req, reply, done) {
    req.requestId = randomUUID();
    done();
}

module.exports = requestIdMiddleware;