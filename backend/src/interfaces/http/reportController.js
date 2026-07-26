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



export const createReportController = (
    authService,
    reportService
) => ({



    async getAll(
        req,
        res
    ){


        const { user } =
            await authService.authenticate(
                req.headers.authorization
            );



        const reports =
            await reportService.getReports(
                user
            );



        return reply(
            res,
            200,
            reports
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



        const report =
            await reportService.getReportById(
                user,
                id
            );



        return reply(
            res,
            200,
            report
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



        const report =
            await reportService.createReport(
                user,
                body
            );



        return reply(
            res,
            201,
            report
        );


    }



});