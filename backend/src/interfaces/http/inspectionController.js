const reply = (
    res,
    status,
    payload
) => {

    res.writeHead(
        status,
        {
            "Content-Type":
                "application/json; charset=utf-8"
        }
    );

    res.end(
        JSON.stringify(payload)
    );

};


export const createInspectionController = (
    authService,
    inspectionService,
    reportService,
    declarationService
) => ({

    async getAll(
        req,
        res
    ){

        const { user } =
            await authService.authenticate(
                req.headers.authorization
            );

        const inspections =
            await inspectionService.getInspections(
                user
            );

        return reply(
            res,
            200,
            inspections
        );

    },


    async getById(
        req,
        res,
        id
    ){

        const { user } =
            await authService.authenticate(
                req.headers.authorization
            );

        const inspection =
            await inspectionService.getInspectionById(
                user,
                id
            );

        return reply(
            res,
            200,
            inspection
        );

    },


    async create(
        req,
        res,
        body
    ){

        const { user } =
            await authService.authenticate(
                req.headers.authorization
            );

        const {
            officerId:ignoredOfficerId,
            officerName:ignoredOfficerName,
            officer:ignoredOfficer,
            ...clientData
        } = body;


        const inspectionData = {

            ...clientData,

            officerId:user.id,

            officerName:user.name,

            officer:
                user.name

        };

        const inspection =
            await inspectionService.createInspection(
                user,
                inspectionData
            );


        await declarationService.recordInspection(
            inspection
        );


        let report = null;


        if (
            inspection.status === "Completed"
        ) {

            report =
                await reportService.createReport(
                    user,
                    {
                        inspectionId:
                            inspection.id,

                        declarationNumber:
                            inspection.declarationNumber,

                        truckPlate:
                            inspection.truckPlate,

                        result:
                            "Completed",

                        status:
                            "Completed",

                        comments:
                            inspection.comments,

                        photos:
                            inspection.photos || [],

                        location:
                            inspection.location,

                        declaration:
                            body.declaration || null,

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

        }

        return reply(
            res,
            201,
            {
                ...inspection,
                report
            }
        );

    },


    async updateStatus(
        req,
        res,
        id,
        body
    ){

        const { user } =
            await authService.authenticate(
                req.headers.authorization
            );

        const result =
            await inspectionService.updateStatus(
                user,
                id,
                body.status
            );


        if (!result) {

            return reply(
                res,
                404,
                {
                    error:"Inspection not found."
                }
            );

        }


        await declarationService.recordInspectionStatus(
            result
        );

        let report = null;

        // Completion can occur after an inspection was created. Keep that
        // report attached to this inspection without replacing another one.
        if (result.status === "Completed") {

            report =
                await reportService.createReportForCompletedInspection(
                    user,
                    result
                );

        }

        return reply(
            res,
            200,
            {
                ...result,
                report
            }
        );

    }

});
