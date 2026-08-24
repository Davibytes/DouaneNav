import api from "../api/axios.js";

let cachedDashboard = null;
let pendingRequest = null;

export const clearDashboardCache = () => {
    cachedDashboard = null;
    pendingRequest = null;
};

export const getDashboard = async ({ force = false } = {}) => {
    if (!force && cachedDashboard) {
        return cachedDashboard;
    }

    if (pendingRequest) {
        return pendingRequest;
    }

    pendingRequest = api.get("/dashboard").then((response) => {
        cachedDashboard = response.data;
        return cachedDashboard;
    }).finally(() => {
        pendingRequest = null;
    });

    return pendingRequest;
};

export const refreshDashboard = async () => {
    return getDashboard({ force:true });
};
