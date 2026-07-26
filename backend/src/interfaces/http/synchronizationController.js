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





export const createSynchronizationController = (
    authService,
    synchronizationService
) => ({






    async getStatus(
        req,
        res
    ){


        const { user } =
            await authService.authenticate(
                req.headers.authorization
            );



        const result =
            await synchronizationService.getStatus(
                user
            );



        return reply(
            res,
            200,
            result
        );


    },









    async synchronize(
        req,
        res
    ){


        const { user } =
            await authService.authenticate(
                req.headers.authorization
            );



        const result =
            await synchronizationService.synchronize(
                user
            );



        return reply(
            res,
            201,
            result
        );


    }





});