import {
    useLanguage
} from "../context/LanguageContext.jsx";

import en from "../i18n/en.js";
import fr from "../i18n/fr.js";


const ConfigurationPage = () => {

    const {
        language
    } = useLanguage();


    const t =
        language === "FR"
            ? fr
            : en;


    return (

        <div className="card">

            <h2>
                {t.configurationTitle}
            </h2>


            <p className="muted">
                {t.systemConfiguration}
            </p>

        </div>

    );

};


export default ConfigurationPage;