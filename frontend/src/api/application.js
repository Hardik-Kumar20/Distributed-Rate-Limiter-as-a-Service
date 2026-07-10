import API from "./axios";

export const getApplications = () => {
    return API.get("/application/application");
};

export const getApplication = (id) => {
    return API.get(`/application/application/${id}`);
};

export const createApplication = (applicationData) => {
    return API.post("/application/application", applicationData);
};

export const deleteApplication = (id) => {
    return API.delete(`/application/application/${id}`);
};