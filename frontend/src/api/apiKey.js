import API from "./axios";

export const getApiKeys = (applicationId) => {
    return API.get(
        `/api_key/applications/${applicationId}/apikeys`
    );
};

export const createApiKey = (applicationId, data) => {
    return API.post(
        `/api_key/applications/${applicationId}/apikeys`,
        data
    );
};

export const deleteApiKey = (keyId) => {
    return API.delete(`/api_key/apikeys/${keyId}`);
};