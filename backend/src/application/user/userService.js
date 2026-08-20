export const createUserService = (
    userRepository
) => ({

    async getAllUsers(){

        return await userRepository.getAll();

    },


    async createOfficer(
        adminUser,
        data
    ){

        if(
            adminUser.role !== "Administrator"
        ){

            const error =
                new Error(
                    "Only administrators can create officer accounts."
                );

            error.statusCode = 403;

            throw error;

        }


        if(
            !data.name ||
            !data.email ||
            !data.temporaryPassword
        ){

            const error =
                new Error(
                    "Name, email and temporary password are required."
                );

            error.statusCode = 422;

            throw error;

        }


        return await userRepository.createOfficer(
            {
                ...data,

                email:
                    data.email
                        .trim()
                        .toLowerCase()

            }
        );

    }

});