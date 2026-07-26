export const createAIAnalysisService = (
    aiAnalysisRepository
) => ({



    async getByDeclaration(
        user,
        declarationId
    ){

        return await aiAnalysisRepository
            .findByDeclarationId(
                declarationId
            );

    },





    async createAnalysis(
        user,
        data
    ){


        const analysis = {

            declarationId:
                data.declarationId,


            riskLevel:
                "Low",


            riskScore:
                15,


            analysis:
                "No anomaly detected. Document verification required.",


            engine:
                "mock"

        };



        return await aiAnalysisRepository
            .create(
                analysis
            );

    }


});