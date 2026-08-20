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


const SynchronizationPage = () => {

    const {
        language
    } = useLanguage();


    const t =
        language === "FR"
            ? fr
            : en;


    const [
        status,
        setStatus
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(false);


    const token =
        localStorage.getItem(
            "douanenav.token"
        );


    useEffect(() => {

        loadStatus();

    }, []);


    const loadStatus =
        async () => {

            try {

                const response =
                    await fetch(
                        `${API_URL}/synchronization/status`,
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
                        "Failed to load synchronization status."
                    );

                }


                setStatus(
                    data
                );

            }

            catch (error) {

                console.log(
                    "Synchronization error:",
                    error.message
                );

            }

        };


    const synchronize =
        async () => {

            try {

                setLoading(true);


                const response =
                    await fetch(
                        `${API_URL}/synchronization`,
                        {
                            method: "POST",

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
                        "Synchronization failed."
                    );

                }


                await loadStatus();

            }

            catch (error) {

                console.log(
                    "Synchronization error:",
                    error.message
                );

            }

            finally {

                setLoading(false);

            }

        };


    return (

        <div>

            <div className="card">

                <h2>
                    {t.synchronizationTitle}
                </h2>


                <p className="muted">
                    {t.synchronizationMonitoring}
                </p>


                {
                    status && (

                        <div>

                            <p>
                                {t.status}:
                                {" "}
                                {status.status ||
                                    t.unknown}
                            </p>


                            <p>
                                {language === "FR"
                                    ? "Système"
                                    : "System"}:
                                {" "}
                                {status.system ||
                                    t.notAvailable}
                            </p>


                            <p>
                                {t.comments}:
                                {" "}
                                {status.message ||
                                    t.notAvailable}
                            </p>


                            <p>
                                {language === "FR"
                                    ? "Dernière synchronisation"
                                    : "Last Sync"}:
                                {" "}
                                {
                                    status.createdAt
                                        ? new Date(
                                            status.createdAt
                                        ).toLocaleString()
                                        : t.notAvailable
                                }
                            </p>

                        </div>

                    )
                }


                <button

                    className="button"

                    onClick={
                        synchronize
                    }

                    disabled={
                        loading
                    }

                >

                    {
                        loading
                            ? (
                                language === "FR"
                                    ? "Synchronisation..."
                                    : "Synchronizing..."
                            )
                            : (
                                language === "FR"
                                    ? "Synchroniser maintenant"
                                    : "Synchronize Now"
                            )
                    }

                </button>

            </div>

        </div>

    );

};


export default SynchronizationPage;