import { connectMongo } from "../database/mongo.js";


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



    async findById(id){

        const database =
            await connectMongo();


        return await database
            .collection("inspection_reports")
            .findOne({
                _id:id
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