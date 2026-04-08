const Fastify = require('fastify');
const checkRoute = require('./api/rest/routes/check.route');

const app = Fastify();

app.post('/check', checkRoute);

module.exports = app;