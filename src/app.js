const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

const checkRoutes = require("./api/rest/routes/check.route");
const applicationRoutes = require("./api/rest/routes/application.routes");
const apiKeyRoutes = require("./api/rest/routes/api_key.route");
const authRoutes = require("./api/rest/routes/auth.routes");
const metricsRoute = require("./api/rest/routes/metrics.route");
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


app.use("/metrics", metricsRoute);
module.exports = app;