import { connectMongo } from "../database/mongo.js";


export class AIAnalysisRepository {


    async findAll(){

        const database =
            await connectMongo();


        return await database
            .collection("ai_analysis")
            .find({})
            .sort({
                createdAt:-1
            })
            .toArray();

    }



    async findByDeclarationId(
        declarationId
    ){

        const database =
            await connectMongo();


        return await database
            .collection("ai_analysis")
            .findOne({
                declarationId
            });

    }





    async create(data){

        const database =
            await connectMongo();


        const analysis = {

            ...data,

            engine:
                "mock",

            createdAt:
                new Date()

        };



        const result =
            await database
                .collection("ai_analysis")
                .insertOne(
                    analysis
                );



        return {

            id:
                result.insertedId,

            ...analysis

        };

    }


}