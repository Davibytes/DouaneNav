import { ObjectId } from "mongodb";
import { connectMongo } from "../database/mongo.js";


export class InspectionRepository {


    async findAll(){

        const database =
            await connectMongo();

        return await database
            .collection("inspections")
            .find({})
            .sort({
                createdAt:-1
            })
            .toArray();

    }



    async findById(id){

        const database =
            await connectMongo();


        return await database
            .collection("inspections")
            .findOne({

                _id:
                    new ObjectId(id)

            });

    }




    async create(data){

        const database =
            await connectMongo();


        const inspection = {

            ...data,

            status:
                data.status ||
                "Pending",

            createdAt:
                new Date()

        };


        const result =
            await database
                .collection("inspections")
                .insertOne(
                    inspection
                );


        return {

            id:
                result.insertedId,

            ...inspection

        };

    }





    async updateStatus(id,status){

        const database =
            await connectMongo();


        return await database
            .collection("inspections")
            .updateOne(

                {

                    _id:
                        new ObjectId(id)

                },

                {

                    $set:{

                        status

                    }

                }

            );

    }


}