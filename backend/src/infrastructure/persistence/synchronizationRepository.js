import { connectMongo } from "../database/mongo.js";


export class SynchronizationRepository {


    async getStatus(){

        const database =
            await connectMongo();


        return await database
            .collection("synchronization_logs")
            .find({})
            .sort({
                createdAt:-1
            })
            .limit(1)
            .toArray();

    }





    async create(data){

        const database =
            await connectMongo();


        const log = {

            ...data,

            createdAt:
                new Date()

        };


        const result =
            await database
                .collection("synchronization_logs")
                .insertOne(
                    log
                );


        return {

            id:
                result.insertedId,

            ...log

        };

    }


}