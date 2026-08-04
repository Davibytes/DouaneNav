import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    translations
} from "../i18n/index.js";

const LanguageContext =
    createContext();



export const LanguageProvider = ({
    children
}) => {


    const [
        language,
        setLanguage
    ] = useState("EN");



    useEffect(()=>{

        loadLanguage();

    },[]);




    const loadLanguage = async()=>{

        try{

            const savedLanguage =
                await AsyncStorage.getItem(
                    "language"
                );


            if(

                savedLanguage &&

                translations[savedLanguage]

            ){

                setLanguage(
                    savedLanguage
                );

            }

        }

        catch(error){

            console.log(
                "Language loading error:",
                error.message
            );

        }

    };





    const changeLanguage = async(newLanguage)=>{

        try{

            setLanguage(
                newLanguage
            );

            await AsyncStorage.setItem(

                "language",

                newLanguage

            );

        }

        catch(error){

            console.log(
                "Language saving error:",
                error.message
            );

        }

    };





    return(

        <LanguageContext.Provider

            value={{

                language,

                changeLanguage,

                t:
                    translations[language]
                    ||
                    translations.EN

            }}

        >

            {children}

        </LanguageContext.Provider>

    );

};





export const useLanguage = ()=>{

    const context =
        useContext(
            LanguageContext
        );

    if(!context){

        throw new Error(
            "useLanguage must be used inside LanguageProvider"
        );

    }

    return context;

};