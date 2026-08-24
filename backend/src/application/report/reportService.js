import { ReportRepository } from "../../infrastructure/persistence/reportRepository.js";


const reportRepository =
    new ReportRepository();



export const createReportService = () => ({



    async getReports(user){


        return user.role === "Customs Officer"
            ? await reportRepository.findByOfficerId(
                user.id
            )
            : await reportRepository.findAll();


    },





    async getReportById(
        user,
        id
    ){

        const report = await reportRepository.findById(id);

        if (
            report &&
            user.role === "Customs Officer" &&
            report.officerId !== user.id
        ) {

            throw Object.assign(
                new Error("Report not found."),
                { statusCode:404 }
            );

        }

        return report;


    },






    async createReport(
        user,
        data
    ){


        const report = {

            ...data,

            officerId:
                user.id,

            officerName:
                user.name,

            officer:
                user.name

        };



        return await reportRepository.create(
            report
        );


    },


    async createReportForCompletedInspection(
        user,
        inspection
    ){

        const existing =
            await reportRepository.findByInspectionId(
                inspection._id || inspection.id
            );

        if (existing) {

            return existing;

        }

        return await this.createReport(
            user,
            {
                inspectionId:
                    inspection._id || inspection.id,

                declarationNumber:
                    inspection.declarationNumber,

                truckPlate:
                    inspection.truckPlate,

                result:"Completed",

                status:"Completed",

                comments:
                    inspection.comments,

                photos:
                    inspection.photos || [],

                location:
                    inspection.location,

                declaration:
                    inspection.declaration || null,

                inspectionType:
                    inspection.isReinspection
                        ? "reinspection"
                        : "initial",

                isReinspection:
                    Boolean(
                        inspection.isReinspection
                    )
            }
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
