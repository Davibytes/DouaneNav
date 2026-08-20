import api from "../api/axios.js";


export const login = async (
    email,
    password
) => {

    console.log(
        "LOGIN REQUEST:",
        email
    );


    const response =
        await api.post(
            "/auth/login",
            {
                email,
                password
            },
            {
                headers: {
                    "X-Client-Platform":
                        "mobile"
                }
            }
        );


    return response.data;

};


export const getCurrentUser = async () => {

    const response =
        await api.get(
            "/auth/me"
        );


    return response.data;

};


export const logout = async () => {

    const response =
        await api.post(
            "/auth/logout"
        );


    return response.data;

};