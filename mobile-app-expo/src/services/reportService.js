import api from "../api/axios.js";

import AsyncStorage from "@react-native-async-storage/async-storage";


const REPORT_STORAGE_KEY =
    "douanenav_reports";




export const getReports = async () => {


    try{

        const response =
            await api.get(
                "/reports"
            );


        const reports =
            response.data;



        await AsyncStorage.setItem(

            REPORT_STORAGE_KEY,

            JSON.stringify(
                reports
            )

        );



        return reports;


    }


    catch(error){


        const savedReports =
            await AsyncStorage.getItem(
                REPORT_STORAGE_KEY
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


    try{


        const response =
            await api.post(
                "/reports",
                report
            );



        const savedReports =
            await AsyncStorage.getItem(
                REPORT_STORAGE_KEY
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

            REPORT_STORAGE_KEY,

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
                REPORT_STORAGE_KEY
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

            REPORT_STORAGE_KEY,

            JSON.stringify(
                reports
            )

        );



        return offlineReport;


    }


};