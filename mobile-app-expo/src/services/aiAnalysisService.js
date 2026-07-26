import api from "./api.js";


export const runAIAnalysis = async (
    data
) => {

    const response =
        await api.post(
            "/ai-analysis",
            data
        );


    return response.data;

};


export const getAIAnalysis = async (
    declarationNumber
) => {

    const response =
        await api.get(
            `/ai-analysis/${declarationNumber}`
        );


    return response.data;

};