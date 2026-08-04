import api from "../api/axios.js";


// Get all declarations from backend
export const getDeclarations = async () => {

    const response =
        await api.get(
            "declarations"
        );

    return response.data;

};



// Get one declaration details
export const getDeclarationById = async (
    id
) => {

    const response =
        await api.get(
            `declarations/${id}`
        );

    return response.data;

};



// Search declarations
export const searchDeclarations = async (
    query
) => {

    const response =
        await api.get(
            `declarations/search?q=${encodeURIComponent(query)}`
        );

    return response.data;

};