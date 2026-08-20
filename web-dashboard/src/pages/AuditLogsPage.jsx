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


const AuditLogsPage = () => {

    const {
        language
    } = useLanguage();


    const t =
        language === "FR"
            ? fr
            : en;


    const [
        logs,
        setLogs
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

        loadLogs();

    }, []);


    const loadLogs = async () => {

        try {

            setLoading(true);


            const response =
                await fetch(
                    `${API_URL}/audit-logs`,
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
                    "Failed to load audit logs."
                );

            }


            setLogs(
                Array.isArray(data)
                    ? data
                    : []
            );

        }

        catch (error) {

            console.log(
                "Audit logs error:",
                error.message
            );


            setLogs([]);

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div>

            <div className="card">

                <h2>
                    {t.auditLogsTitle}
                </h2>


                <p className="muted">
                    {t.auditActivity}
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

                    <table
                        className="inspection-table"
                    >

                        <thead>

                            <tr>

                                <th>
                                    {
                                        language === "FR"
                                            ? "Action"
                                            : "Action"
                                    }
                                </th>


                                <th>
                                    {
                                        language === "FR"
                                            ? "Utilisateur"
                                            : "User"
                                    }
                                </th>


                                <th>
                                    {t.date}
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                logs.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan="3"
                                        >
                                            {
                                                language === "FR"
                                                    ? "Aucun journal d'audit trouvé."
                                                    : "No audit logs found."
                                            }
                                        </td>

                                    </tr>

                                )
                            }


                            {
                                logs.map(
                                    (
                                        log,
                                        index
                                    ) => (

                                        <tr
                                            key={
                                                log._id ||
                                                log.id ||
                                                index
                                            }
                                        >

                                            <td>
                                                {
                                                    log.action ||
                                                    t.notAvailable
                                                }
                                            </td>


                                            <td>
                                                {
                                                    log.user ||
                                                    log.userEmail ||
                                                    (
                                                        language === "FR"
                                                            ? "Système"
                                                            : "System"
                                                    )
                                                }
                                            </td>


                                            <td>

                                                {
                                                    log.createdAt ||
                                                    log.date

                                                        ?

                                                        new Date(
                                                            log.createdAt ||
                                                            log.date
                                                        ).toLocaleString()

                                                        :

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


export default AuditLogsPage;