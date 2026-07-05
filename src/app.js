const express = require("express");

const app = express();

app.use(express.json());

const checkRoutes = require("./api/rest/routes/check.route")
const applicationRoutes = require("./api/rest/routes/application.routes")
const apiKeyRoutes = require("./api/rest/routes/api_key.route")
app.use(
    "/check",
    checkRoutes
)

app.use(
    "/application",
    applicationRoutes
)


app.use(
    "/api_key",
    apiKeyRoutes
)
module.exports = app;