import api from "../api/axios.js";


export const getInspections = async () => {

    const response =
        await api.get("/inspections");


    return response.data;

};




export const createInspection = async (inspection) => {

    const response =
        await api.post(
            "/inspections",
            inspection
        );


    return response.data;

};


export const getInspectionById = async (id) => {

    const response =
        await api.get(`/inspections/${id}`);

    return response.data;

};


export const updateInspection = async (id, inspection) => {

    const response =
        await api.put(`/inspections/${id}`, inspection);

    return response.data;

};
