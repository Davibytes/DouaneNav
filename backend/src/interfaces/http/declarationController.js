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


            /*
                TEMPORARY DEMO MODE

                Authentication removed
                to allow screenshots.

                Production:
                restore authService.authenticate()
            */


            const declarations =
                await declarationService.getDeclarations(
                    {
                        role:"Administrator"
                    }
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



            const declaration =

                await declarationService.getDeclarationById(

                    {
                        role:"Administrator"
                    },

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



            const declarations =

                await declarationService.searchDeclarations(

                    {
                        role:"Administrator"
                    },

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