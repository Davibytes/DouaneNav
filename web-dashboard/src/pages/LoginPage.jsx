import {
    useState
} from "react";

import {
    useNavigate,
    Navigate
} from "react-router-dom";

import {
    useAuth
} from "../context/AuthContext.jsx";

import {
    useLanguage
} from "../context/LanguageContext.jsx";

import en from "../i18n/en.js";
import fr from "../i18n/fr.js";


export default function LoginPage() {

    const navigate =
        useNavigate();


    const {
        login,
        user
    } = useAuth();


    const {
        language,
        changeLanguage
    } = useLanguage();


    const t =
        language === "FR"
            ? fr
            : en;


    const [
        email,
        setEmail
    ] = useState("");


    const [
        password,
        setPassword
    ] = useState("");


    const [
        error,
        setError
    ] = useState("");


    const [
        loading,
        setLoading
    ] = useState(false);


    if (user) {

        return (
            <Navigate
                to="/dashboard"
            />
        );

    }


    const handleSubmit =
        async (event) => {

            event.preventDefault();

            setError("");

            setLoading(true);


            try {

                await login(
                    email,
                    password
                );


                navigate(
                    "/dashboard"
                );

            }

            catch (error) {

                setError(
                    error.message ||
                    t.loginFailed
                );

            }

            finally {

                setLoading(false);

            }

        };


    return (

        <main
            className="page-shell"
        >

            <div
                className="login-language"
            >

                <button
                    type="button"
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
                    type="button"
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


            <section
                className="brand-panel"
            >

                <img
                    src="/src/assets/logo.png"
                    alt="Cameroon Customs logo"
                    className="logo"
                />


                <p className="eyebrow">
                    CAMEROON CUSTOMS
                </p>


                <h1>
                    {t.appName}
                </h1>


                <p className="intro">
                    {
                        language === "FR"
                            ? "Plateforme d'aide à la décision complétant CAMCIS pour la vérification des déclarations douanières et les opérations d'inspection."
                            : "Decision support platform complementing CAMCIS for customs declaration verification and inspection workflows."
                    }
                </p>

            </section>


            <section
                className="login-panel"
            >

                <div>

                    <p className="eyebrow green">
                        {t.secureAccess}
                    </p>


                    <h2>
                        {t.welcomeBack}
                    </h2>


                    <p className="muted">
                        {t.loginSubtitle}
                    </p>


                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <label>

                            {t.email}


                            <input
                                type="email"
                                value={
                                    email
                                }
                                onChange={
                                    event =>
                                        setEmail(
                                            event.target.value
                                        )
                                }
                                placeholder={
                                    language === "FR"
                                        ? "Entrez votre email"
                                        : "Enter your email"
                                }
                                required
                            />

                        </label>


                        <label>

                            {t.password}


                            <input
                                type="password"
                                value={
                                    password
                                }
                                onChange={
                                    event =>
                                        setPassword(
                                            event.target.value
                                        )
                                }
                                placeholder={
                                    language === "FR"
                                        ? "Entrez votre mot de passe"
                                        : "Enter your password"
                                }
                                required
                            />

                        </label>


                        {
                            error && (

                                <p
                                    className="error"
                                >
                                    {error}
                                </p>

                            )
                        }


                        <button
                            className="login-button"
                            type="submit"
                            disabled={
                                loading
                            }
                        >
                            {
                                loading
                                    ? t.signingIn
                                    : t.signIn
                            }
                        </button>

                    </form>

                </div>

            </section>

        </main>

    );

}