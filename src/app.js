const Fastify = require("fastify");

const app = Fastify({
    logger: true
});

// register routes
app.register(require("./api/rest/routes/check.route"),{
    prefix: "/api",
});

module.exports = app;
