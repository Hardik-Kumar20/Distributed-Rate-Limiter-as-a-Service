const metricsService = require("../../metrics/metrics.service");

module.exports = {
    getMetrics(){
        return metricsService.getMetrics();
    }
}