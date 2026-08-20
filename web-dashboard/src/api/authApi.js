const API_URL =
    "https://douanenav-backend.onrender.com/api/auth";


export const loginUser = async (
    email,
    password
) => {

    const response =
        await fetch(
            `${API_URL}/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "X-Client-Platform":
                        "web"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );


    const data =
        await response.json();


    if (!response.ok) {

        throw new Error(
            data.error ||
            "Login failed"
        );

    }


    return data;

};


export const getCurrentUser = async (
    token
) => {

    const response =
        await fetch(
            `${API_URL}/me`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );


    const data =
        await response.json();


    if (!response.ok) {

        throw new Error(
            data.error ||
            "Session expired"
        );

    }


    return data.user;

};


export const logoutUser = async (
    token
) => {

    await fetch(
        `${API_URL}/logout`,
        {
            method: "POST",

            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

};