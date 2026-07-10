import API from "./axios";

export const register = (userData) => {
    return API.post("/auth/register", userData);
};

export const login = (userData) => {
    return API.post("/auth/login", userData);
};