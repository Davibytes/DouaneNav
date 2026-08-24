export const createInspectionService = (
    inspectionRepository
) => ({

    async getInspections(user){

        return await inspectionRepository.findAll(
            user
        );

    },


    async getInspectionById(
        user,
        id
    ){

        const inspection =
            await inspectionRepository.findById(id);

        if (
            inspection &&
            user.role === "Customs Officer" &&
            inspection.officerId !== user.id
        ) {

            throw Object.assign(
                new Error("Inspection not found."),
                { statusCode:404 }
            );

        }

        return inspection;

    },


    async createInspection(
        user,
        data
    ){

        const activeInspection =
            await inspectionRepository.findActiveByDeclaration(
                data.declarationNumber
            );


        if (activeInspection) {

            const error = new Error(
                "This declaration is currently being inspected. Complete that work before starting a cross-check."
            );

            error.statusCode = 409;

            throw error;

        }


        return await inspectionRepository.create(data);

    },


    async updateStatus(
        user,
        id,
        status
    ){

        return await inspectionRepository.updateStatus(
            id,
            status,
            user
        );

    }

});
