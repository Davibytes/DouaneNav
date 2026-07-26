import { ReportRepository } from "../../infrastructure/persistence/reportRepository.js";


const reportRepository =
    new ReportRepository();



export const createReportService = () => ({



    async getReports(user){


        return await reportRepository.findAll();


    },





    async getReportById(
        user,
        id
    ){


        return await reportRepository.findById(
            id
        );


    },






    async createReport(
        user,
        data
    ){


        const report = {

            ...data,

            officer:
                user.name

        };



        return await reportRepository.create(
            report
        );


    },






    async getReportsByDeclaration(
        user,
        declarationNumber
    ){


        return await reportRepository.findByDeclaration(
            declarationNumber
        );


    }



});