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