const API_URL = "http://localhost:5000/api";


export const getDeclarations = async () => {

  const token =
    localStorage.getItem("douanenav.token");


  const response =
    await fetch(
      `${API_URL}/declarations`,
      {
        method: "GET",

        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );


  if (!response.ok) {

    throw new Error(
      "Failed to fetch declarations."
    );

  }


  return await response.json();

};




export const searchDeclarations = async (query) => {

  const token =
    localStorage.getItem("douanenav.token");


  const response =
    await fetch(
      `${API_URL}/declarations/search?q=${query}`,
      {
        method:"GET",

        headers:{
          "Authorization":`Bearer ${token}`,
          "Content-Type":"application/json"
        }
      }
    );



  if (!response.ok) {

    throw new Error(
      "Failed to search declarations."
    );

  }


  return await response.json();

};