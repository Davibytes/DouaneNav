export const createSynchronizationService = (
    synchronizationRepository
) => ({



    async getStatus(
        user
    ){

        const logs =
            await synchronizationRepository
                .getStatus();


        if(logs.length === 0){

            return {

                status:"Not synchronized",

                system:"CAMCIS",

                lastSync:null

            };

        }


        return logs[0];

    },





    async synchronize(
        user
    ){

        return await synchronizationRepository
            .create({

                status:"Completed",

                system:"CAMCIS",

                message:
                    "Mock synchronization completed",

                recordsProcessed:0,

                engine:"mock"

            });

    }


});