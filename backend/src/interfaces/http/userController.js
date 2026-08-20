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


export const createUserController = (
    authService,
    userService
) => ({

    async getAll(
        req,
        res
    ){

        const { user } =
            await authService.authenticate(
                req.headers.authorization
            );


        if(
            user.role !== "Administrator"
        ){

            return reply(
                res,
                403,
                {
                    error:
                        "Only administrators can view users."
                }
            );

        }


        const users =
            await userService.getAllUsers(
                user
            );


        return reply(
            res,
            200,
            users
        );

    },


    async createOfficer(
        req,
        res,
        body
    ){

        try {

            const { user } =
                await authService.authenticate(
                    req.headers.authorization
                );


            const officer =
                await userService.createOfficer(
                    user,
                    body
                );


            return reply(
                res,
                201,
                officer
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