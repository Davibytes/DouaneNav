import {
    NavLink,
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../context/AuthContext.jsx";

import {
    useLanguage
} from "../context/LanguageContext.jsx";

import en from "../i18n/en.js";
import fr from "../i18n/fr.js";


const Sidebar = () => {

    const {
        logout
    } = useAuth();


    const navigate =
        useNavigate();


    const {
        language,
        changeLanguage
    } = useLanguage();


    const t =
        language === "FR"
            ? fr
            : en;


    const menus = [

        {
            name: "dashboard",
            path: "/dashboard"
        },

        {
            name: "declarations",
            path: "/declarations"
        },

        {
            name: "reports",
            path: "/reports"
        },

        {
            name: "inspectionMonitoring",
            path: "/inspections"
        },

        {
            name: "synchronization",
            path: "/synchronization"
        },

        {
            name: "users",
            path: "/users"
        },

        {
            name: "configuration",
            path: "/configuration"
        },

        {
            name: "auditLogs",
            path: "/audit-logs"
        }

    ];


    const handleLogout =
        async () => {

            await logout();

            navigate(
                "/login"
            );

        };


    return (

        <aside
            className="sidebar"
        >

            <h2
                className="sidebar-title"
            >
                {t.appName}
            </h2>


            <div
                className="language-toggle"
            >

                <button
                    onClick={() =>
                        changeLanguage("FR")
                    }

                    className={
                        language === "FR"
                            ? "active"
                            : ""
                    }
                >
                    FR
                </button>


                <button
                    onClick={() =>
                        changeLanguage("EN")
                    }

                    className={
                        language === "EN"
                            ? "active"
                            : ""
                    }
                >
                    EN
                </button>

            </div>


            <nav>

                {
                    menus.map(
                        menu => (

                            <NavLink

                                key={
                                    menu.path
                                }

                                to={
                                    menu.path
                                }

                                className={({
                                    isActive
                                }) =>

                                    isActive
                                        ? "sidebar-link active"
                                        : "sidebar-link"

                                }

                            >

                                {
                                    t[
                                        menu.name
                                    ]
                                }

                            </NavLink>

                        )
                    )
                }

            </nav>


            <div
                className="sidebar-bottom"
            >

                <button

                    className="settings-link"

                    onClick={() =>
                        navigate(
                            "/settings"
                        )
                    }

                    title={
                        t.settings
                    }

                >

                    <i
                        className="fa-solid fa-gear"
                    />

                </button>


                <button

                    className="logout-button"

                    onClick={
                        handleLogout
                    }

                >

                    {t.logout}

                </button>

            </div>

        </aside>

    );

};


export default Sidebar;