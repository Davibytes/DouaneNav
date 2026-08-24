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




export const createDeclarationController = (

    authService,

    declarationService

) => ({





    async getAll(
        req,
        res
    ){


        try {


            const { user } =
                await authService.authenticate(
                    req.headers.authorization
                );

            const declarations =
                await declarationService.getDeclarations(
                    user
                );



            return reply(

                res,

                200,

                declarations

            );


        }


        catch(error){


            console.log(
                "GET DECLARATIONS ERROR:",
                error.message
            );


            return reply(

                res,

                error.statusCode || 500,

                {
                    error:
                    error.message
                }

            );


        }


    },









    async getById(

        req,

        res,

        id

    ){


        try {



            const { user } =
                await authService.authenticate(
                    req.headers.authorization
                );

            const declaration =

                await declarationService.getDeclarationById(

                    user,

                    id

                );





            return reply(

                res,

                200,

                declaration

            );



        }


        catch(error){


            return reply(

                res,

                error.statusCode || 500,

                {
                    error:
                    error.message
                }

            );


        }


    },









    async search(

        req,

        res,

        query

    ){


        try {



            const { user } =
                await authService.authenticate(
                    req.headers.authorization
                );

            const declarations =

                await declarationService.searchDeclarations(

                    user,

                    query

                );





            return reply(

                res,

                200,

                declarations

            );



        }


        catch(error){


            return reply(

                res,

                error.statusCode || 500,

                {
                    error:
                    error.message
                }

            );


        }


    }





});
