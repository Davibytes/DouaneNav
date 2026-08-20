import {
    useLanguage
} from "../context/LanguageContext.jsx";


import en from "../i18n/en.js";
import fr from "../i18n/fr.js";


const SettingsPage = () => {

    const {
        language
    } = useLanguage();


    const t =
        language === "FR"
            ? fr
            : en;


    return (

        <>

            <div className="card">

                <h2>
                    {t.settingsTitle}
                </h2>


                <p className="muted">
                    {
                        language === "FR"
                            ? "Les préférences de l'application seront disponibles ici."
                            : "Application preferences will be available here."
                    }
                </p>

            </div>


            <div className="card">

                <h3>
                    {t.language}
                </h3>


                <p className="muted">
                    {
                        language === "FR"
                            ? "Prise en charge de l'anglais et du français."
                            : "English and French support."
                    }
                </p>

            </div>


            <div className="card">

                <h3>
                    {
                        language === "FR"
                            ? "Apparence"
                            : "Appearance"
                    }
                </h3>


                <p className="muted">
                    {
                        language === "FR"
                            ? "Préférences du thème et de l'interface."
                            : "Theme and interface preferences."
                    }
                </p>

            </div>

        </>

    );

};


export default SettingsPage;