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





export const createAIAnalysisController = (
    authService,
    aiAnalysisService
) => ({






    async getByDeclaration(
        req,
        res,
        declarationId
    ){


        const { user } =
            await authService.authenticate(
                req.headers.authorization
            );



        const result =
            await aiAnalysisService.getByDeclaration(
                user,
                declarationId
            );



        return reply(
            res,
            200,
            result
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



        const result =
            await aiAnalysisService.createAnalysis(
                user,
                body
            );



        return reply(
            res,
            201,
            result
        );


    }





});