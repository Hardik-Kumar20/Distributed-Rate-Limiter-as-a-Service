const express = require("express");

const app = express();

app.use(express.json());

const checkRoutes = require("./api/rest/routes/check.route")
const applicationRoutes = require("./api/rest/routes/application.routes")
const apiKeyRoutes = require("./api/rest/routes/api_key.route")
const authRoutes = require("./api/rest/routes/auth.routes")
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


app.use("/auth", authRoutes);
module.exports = app;