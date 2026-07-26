export const createUserService = (
    userRepository
) => ({

    async getAllUsers(){

        return await userRepository.getAll();

    }

});