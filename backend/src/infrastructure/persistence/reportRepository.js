import { connectMongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";


export class ReportRepository {


    async findAll(){

        const database =
            await connectMongo();


        return await database
            .collection("inspection_reports")
            .find({})
            .sort({
                createdAt:-1
            })
            .toArray();

    }


    async findByOfficerId(officerId){

        const database =
            await connectMongo();

        return await database
            .collection("inspection_reports")
            .find({ officerId })
            .sort({
                createdAt:-1
            })
            .toArray();

    }



    async findById(id){

        const database =
            await connectMongo();


        return await database
            .collection("inspection_reports")
            .findOne({
                _id:new ObjectId(id)
            });

    }


    async findByInspectionId(inspectionId){

        const database =
            await connectMongo();

        return await database
            .collection("inspection_reports")
            .findOne({
                inspectionId:{
                    $in:[
                        inspectionId,
                        String(inspectionId)
                    ]
                }
            });

    }




    async create(data){

        const database =
            await connectMongo();


        const report = {

            ...data,

            createdAt:
                new Date()

        };


        const result =
            await database
                .collection("inspection_reports")
                .insertOne(report);



        return {

            id:
                result.insertedId,

            ...report

        };

    }


    async findOrCreateForInspection(data){

        const database = await connectMongo();
        const inspectionId = String(data.inspectionId);
        const report = {
            ...data,
            inspectionId,
            createdAt:new Date()
        };

        const result = await database
            .collection("inspection_reports")
            .findOneAndUpdate(
                { inspectionId },
                { $setOnInsert:report },
                { upsert:true, returnDocument:"after" }
            );

        return result.value || result;

    }




    async findByDeclaration(
        declarationNumber
    ){

        const database =
            await connectMongo();


        return await database
            .collection("inspection_reports")
            .find({
                declarationNumber
            })
            .sort({
                createdAt:-1
            })
            .toArray();

    }


}
