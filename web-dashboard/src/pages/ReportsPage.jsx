import {
    useEffect,
    useState
} from "react";


const API_URL =
    "http://localhost:5000/api";



const ReportsPage = ()=>{


    const [
        reports,
        setReports
    ] = useState(null);



    const [
        loading,
        setLoading
    ] = useState(true);



    const token =
        localStorage.getItem(
            "douanenav.token"
        );






    useEffect(()=>{

        loadReports();

    },[]);







    const loadReports = async()=>{


        try{


            const response =
                await fetch(

                    `${API_URL}/reports`,

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
                    "Failed to load reports"
                );

            }



            setReports(data);



        }

        catch(error){


            console.log(
                "Reports error:",
                error.message
            );


        }

        finally{


            setLoading(false);


        }


    };






    if(loading){

        return (

            <p>
                Loading reports...
            </p>

        );

    }







    return (

        <div>



            <section className="stats-grid">





                <div className="card stat-card">


                    <p className="card-label">

                        Completed Inspections

                    </p>



                    <h2>

                        {
                            reports?.completedInspections
                            ??
                            0
                        }

                    </h2>



                </div>









                <div className="card stat-card">


                    <p className="card-label">

                        Most Common Destination

                    </p>



                    <h2>

                        {
                            reports?.topDestination
                            ??
                            "N/A"
                        }

                    </h2>



                </div>









                <div className="card stat-card">


                    <p className="card-label">

                        Monthly Reports

                    </p>



                    <h2>

                        {
                            reports?.monthlyReports
                            ??
                            0
                        }

                    </h2>



                </div>




            </section>








            <section className="card">


                <h3>
                    Operational Reports
                </h3>



                <p className="muted">

                    CustomsTrack AI reporting module.

                </p>






                {
                    reports?.summary && (


                        <p>

                            {
                                reports.summary
                            }

                        </p>


                    )
                }




            </section>





        </div>

    );


};



export default ReportsPage;