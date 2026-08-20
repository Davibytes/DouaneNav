import {
    useEffect,
    useState
} from "react";


const API_URL =
     "https://douanenav-backend.onrender.com/api";



const UsersPage = ()=>{


    const [
        users,
        setUsers
    ] = useState([]);



    const [
        loading,
        setLoading
    ] = useState(true);



    const token =
        localStorage.getItem(
            "douanenav.token"
        );






    useEffect(()=>{

        loadUsers();

    },[]);








    const loadUsers = async()=>{


        try{


            const response =
                await fetch(

                    `${API_URL}/users`,

                    {

                        headers:{

                            Authorization:
                            `Bearer ${token}`,

                            "Content-Type":
                            "application/json"

                        }

                    }

                );



            const data =
                await response.json();



            if(!response.ok){

                throw new Error(
                    data.error ||
                    "Failed to load users"
                );

            }



            setUsers(data);



        }

        catch(error){


            console.log(
                "Users error:",
                error.message
            );


        }

        finally{


            setLoading(false);


        }


    };








    if(loading){

        return (

            <div className="card">

                <p>
                    Loading users...
                </p>

            </div>

        );

    }









    return (

        <div>


            <div className="card">


                <h2>
                    User Management
                </h2>



                <p className="muted">

                    CustomsTrack AI authorized users.

                </p>



            </div>







            <div className="card">


                <table className="inspection-table">


                    <thead>


                        <tr>


                            <th>
                                Name
                            </th>


                            <th>
                                Email
                            </th>


                            <th>
                                Role
                            </th>


                            <th>
                                Status
                            </th>


                        </tr>


                    </thead>





                    <tbody>



                        {
                            users.map(

                                (user,index)=>(


                                    <tr

                                        key={
                                            user._id ||
                                            index
                                        }

                                    >



                                        <td>

                                            {
                                                user.name
                                            }

                                        </td>




                                        <td>

                                            {
                                                user.email
                                            }

                                        </td>




                                        <td>

                                            {
                                                user.role
                                            }

                                        </td>




                                        <td>


                                            <span className="status pending">

                                                {
                                                    user.status ||
                                                    "Active"
                                                }

                                            </span>


                                        </td>




                                    </tr>


                                )

                            )
                        }



                    </tbody>



                </table>



            </div>



        </div>

    );

};



export default UsersPage;