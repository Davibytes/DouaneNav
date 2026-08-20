import {
    createContext,
    useContext,
    useState
} from "react";


const LanguageContext =
    createContext();


export const LanguageProvider = ({
    children
}) => {

    const [
        language,
        setLanguage
    ] = useState(
        localStorage.getItem(
            "douanenav.language"
        ) || "EN"
    );


    const changeLanguage = (
        newLanguage
    ) => {

        const normalized =
            newLanguage === "FR"
                ? "FR"
                : "EN";


        setLanguage(
            normalized
        );


        localStorage.setItem(
            "douanenav.language",
            normalized
        );

    };


    return (

        <LanguageContext.Provider
            value={{
                language,
                changeLanguage
            }}
        >
            {children}
        </LanguageContext.Provider>

    );

};


export const useLanguage = () =>
    useContext(
        LanguageContext
    );