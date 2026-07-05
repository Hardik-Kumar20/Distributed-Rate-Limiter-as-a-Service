const express = require("express");

const app = express();

app.use(express.json());

const checkRoutes = require("./api/rest/routes/check.route")
const applicationRoutes = require("./api/rest/routes/application.routes")
app.use(
    "/check",
    checkRoutes
)

app.use(
    "/application",
    applicationRoutes
)

module.exports = app;