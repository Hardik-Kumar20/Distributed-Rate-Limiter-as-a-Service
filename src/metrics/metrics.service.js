class MetricsService {
    constructor() {
        this.totalRequests = 0;
        this.allowedRequests = 0;
        this.blockedRequests = 0;

        this.requestsByApplication = {};

        this.requestsByApiKey = {};
    }

    record({ applicationId, apiKeyId, allowed }) {
        this.totalRequests++;

        if(allowed) {
            this.allowedRequests++;
        }else {
            this.blockedRequests++;
        }

        this.requestsByApplication[applicationId] = (this.requestsByApplication[applicationId] || 0) + 1;

        this.requestsByApiKey[apiKeyId] = (this.requestsByApiKey[apiKeyId] || 0) + 1;
    }

    getMetrics() {
        return {
            totalRequests: this.totalRequests,
            allowedRequests: this.allowedRequests,
            blockedRequests: this.blockedRequests,
            requestsByApplication: this.requestsByApplication,
            requestsByApiKey: this.requestsByApiKey,
        };
    }
}

module.exports = new MetricsService();