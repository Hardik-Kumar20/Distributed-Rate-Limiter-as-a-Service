import API from "./axios";

export const getMetrics = () => {
    return API.get("/metrics");
};