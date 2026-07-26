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



        const users =
            await userService.getAllUsers(
                user
            );



        return reply(
            res,
            200,
            users
        );


    }



});