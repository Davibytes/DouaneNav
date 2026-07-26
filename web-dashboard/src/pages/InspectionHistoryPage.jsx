import {
    useEffect,
    useState
} from "react";



const API_URL =
    "http://localhost:5000/api";



const InspectionHistoryPage = ()=>{


    const [
        inspections,
        setInspections
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

        loadInspections();

    },[]);







    const loadInspections = async()=>{


        try{


            const response =
                await fetch(

                    `${API_URL}/inspections`,

                    {

                        headers:{

                            Authorization:
                            `Bearer ${token}`

                        }

                    }

                );



            const data =
                await response.json();



            setInspections(
                data
            );


        }

        catch(error){


            console.log(
                "Inspection history error:",
                error.message
            );


            setInspections([]);


        }

        finally{


            setLoading(false);


        }


    };







    return (


        <div>


            <div className="card">


                <h2>
                    Inspection History
                </h2>


                <p className="muted">
                    Inspection reports and history.
                </p>



            </div>







            <div className="card">


                {
                    loading ?


                    <p>
                        Loading inspections...
                    </p>


                    :


                    <table className="inspection-table">


                        <thead>


                            <tr>


                                <th>
                                    Declaration
                                </th>


                                <th>
                                    Officer
                                </th>


                                <th>
                                    Status
                                </th>


                                <th>
                                    Location
                                </th>


                                <th>
                                    Comments
                                </th>


                            </tr>


                        </thead>




                        <tbody>


                            {
                                inspections.map(

                                    (item,index)=>(


                                        <tr

                                            key={
                                                item._id ||
                                                index
                                            }

                                        >


                                            <td>

                                                {
                                                    item.declarationNumber
                                                }

                                            </td>



                                            <td>

                                                {
                                                    item.officer ||
                                                    "Not assigned"
                                                }

                                            </td>



                                            <td>

                                                <span className="status pending">

                                                    {
                                                        item.status
                                                    }

                                                </span>

                                            </td>




                                            <td>

                                                {
                                                    item.location ||
                                                    "Unknown"
                                                }

                                            </td>




                                            <td>

                                                {
                                                    item.comments ||
                                                    "None"
                                                }

                                            </td>



                                        </tr>


                                    )

                                )
                            }



                        </tbody>



                    </table>


                }


            </div>


        </div>


    );


};



export default InspectionHistoryPage;