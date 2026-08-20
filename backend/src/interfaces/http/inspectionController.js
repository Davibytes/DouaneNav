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
    inspectionService
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

        const inspectionData = {

            ...body,

            officerId:
                user.id,

            officer:
                user.name

        };

        const inspection =
            await inspectionService.createInspection(
                user,
                inspectionData
            );

        return reply(
            res,
            201,
            inspection
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

        return reply(
            res,
            200,
            result
        );

    }

});