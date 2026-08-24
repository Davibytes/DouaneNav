export const createInspectionService = (
    inspectionRepository
) => ({

    validatePhotos(photos){

        if (!Array.isArray(photos)) {
            return;
        }

        if (photos.length > 3) {

            throw Object.assign(
                new Error("A maximum of 3 photos is allowed per inspection."),
                { statusCode:422 }
            );

        }

    },

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

        this.validatePhotos(data.photos);

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
        data
    ){

        this.validatePhotos(data.photos);

        return await inspectionRepository.updateInspection(
            id,
            data,
            user
        );

    }

});
