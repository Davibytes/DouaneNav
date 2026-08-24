import api from "../api/axios.js";

let cachedReports = null;
let pendingRequest = null;

export const clearReportsCache = () => {
    cachedReports = null;
    pendingRequest = null;
};

export const getReports = async ({ force = false } = {}) => {

    if (!force && cachedReports) {
        return cachedReports;
    }

    if (pendingRequest) {
        return pendingRequest;
    }

    pendingRequest = api.get("/reports").then((response) => {
        const data = response.data;

        cachedReports = Array.isArray(data)
            ? data
            : Array.isArray(data?.reports)
                ? data.reports
                : [];

        return cachedReports;
    }).finally(() => {
        pendingRequest = null;
    });

    return pendingRequest;

};


export const refreshReports = async () => {

    return getReports({ force:true });


};
