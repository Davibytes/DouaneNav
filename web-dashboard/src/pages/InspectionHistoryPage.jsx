import {
    useEffect,
    useState
} from "react";


import {
    useLanguage
} from "../context/LanguageContext.jsx";


import en from "../i18n/en.js";
import fr from "../i18n/fr.js";


const API_URL =
    "https://douanenav-backend.onrender.com/api";


const InspectionHistoryPage = () => {

    const {
        language
    } = useLanguage();


    const t =
        language === "FR"
            ? fr
            : en;


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


    useEffect(() => {

        loadInspections();

    }, []);


    const loadInspections = async () => {

        try {

            setLoading(true);


            const response =
                await fetch(
                    `${API_URL}/inspections`,
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
                    "Failed to load inspections."
                );

            }


            setInspections(
                Array.isArray(data)
                    ? data
                    : []
            );

        }

        catch (error) {

            console.log(
                "Inspection history error:",
                error.message
            );


            setInspections([]);

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div>

            <div className="card">

                <h2>
                    {t.inspectionHistory}
                </h2>


                <p className="muted">
                    {t.inspectionReports}
                </p>

            </div>


            <div className="card">

                {
                    loading

                    ?

                    <p>
                        {t.loading}
                    </p>

                    :

                    inspections.length === 0

                    ?

                    <p className="muted">
                        {t.noData}
                    </p>

                    :

                    <table
                        className="inspection-table"
                    >

                        <thead>

                            <tr>

                                <th>
                                    {t.declaration}
                                </th>

                                <th>
                                    {t.officer}
                                </th>

                                <th>
                                    {t.status}
                                </th>

                                <th>
                                    {t.location}
                                </th>

                                <th>
                                    {t.comments}
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                inspections.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <tr
                                            key={
                                                item._id ||
                                                index
                                            }
                                        >

                                            <td>
                                                {
                                                    item.declarationNumber
                                                    ||
                                                    t.notAvailable
                                                }
                                            </td>


                                            <td>
                                                {
                                                    item.officer
                                                    ||
                                                    t.notAvailable
                                                }
                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        item.status === "Completed"
                                                            ? "status success"
                                                            : "status pending"
                                                    }
                                                >
                                                    {
                                                        item.status
                                                        ||
                                                        t.unknown
                                                    }
                                                </span>

                                            </td>


                                            <td>
                                                {
                                                    item.location
                                                    ||
                                                    t.notAvailable
                                                }
                                            </td>


                                            <td>
                                                {
                                                    item.comments
                                                    ||
                                                    t.notAvailable
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