import api from "../api/axios.js";

import AsyncStorage from "@react-native-async-storage/async-storage";


const REPORT_STORAGE_KEY =
    "douanenav_reports";


const getStorageKey = async () => {

    const token =
        await AsyncStorage.getItem("token");

    // A shared device must not show one officer another officer's cached
    // reports. The authenticated backend response remains authoritative.
    return `${REPORT_STORAGE_KEY}:${token || "anonymous"}`;

};




export const getReports = async () => {

    const storageKey = await getStorageKey();


    try{

        const response =
            await api.get(
                "/reports"
            );


        const reports =
            response.data;



        await AsyncStorage.setItem(

            storageKey,

            JSON.stringify(
                reports
            )

        );



        return reports;


    }


    catch(error){


        const savedReports =
            await AsyncStorage.getItem(
                storageKey
            );



        if(savedReports){

            return JSON.parse(
                savedReports
            );

        }



        throw error;


    }


};








export const createReport = async (
    report
) => {


    const storageKey = await getStorageKey();

    try{


        const response =
            await api.post(
                "/reports",
                report
            );



        const savedReports =
            await AsyncStorage.getItem(
            storageKey
            );



        let reports =
            savedReports
            ?
            JSON.parse(savedReports)
            :
            [];



        reports.push(
            response.data
        );



        await AsyncStorage.setItem(

            storageKey,

            JSON.stringify(
                reports
            )

        );



        return response.data;


    }


    catch(error){


        const offlineReport = {

            ...report,

            offline:true,

            createdAt:
                new Date()
                .toISOString()

        };



        const savedReports =
            await AsyncStorage.getItem(
                storageKey
            );



        let reports =
            savedReports
            ?
            JSON.parse(savedReports)
            :
            [];



        reports.push(
            offlineReport
        );



        await AsyncStorage.setItem(

            storageKey,

            JSON.stringify(
                reports
            )

        );



        return offlineReport;


    }


};
