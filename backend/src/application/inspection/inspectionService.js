export const createInspectionService = (
    inspectionRepository
) => ({

    async getInspections(user){

        return await inspectionRepository.findAll();

    },


    async getInspectionById(
        user,
        id
    ){

        return await inspectionRepository.findById(id);

    },


    async createInspection(
        user,
        data
    ){

        return await inspectionRepository.create(
            data
        );

    },


    async updateStatus(
        user,
        id,
        status
    ){

        return await inspectionRepository.updateStatus(
            id,
            status
        );

    }

});