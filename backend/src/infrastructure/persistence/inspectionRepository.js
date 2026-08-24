import { ObjectId } from "mongodb";
import { connectMongo } from "../database/mongo.js";


export class InspectionRepository {

    async findAll(user){

        const database = await connectMongo();
        const query = user.role === "Customs Officer"
            ? { officerId:user.id }
            : {};

        return await database
            .collection("inspections")
            .find(query)
            .sort({ createdAt:-1 })
            .toArray();

    }


    async findById(id){

        const database = await connectMongo();

        return await database
            .collection("inspections")
            .findOne({ _id:new ObjectId(id) });

    }


    async findActiveByDeclaration(declarationNumber){

        const database = await connectMongo();

        return await database
            .collection("inspections")
            .findOne(
                {
                    declarationNumber,
                    status:"In Progress"
                },
                {
                    sort:{ updatedAt:-1 }
                }
            );

    }


    async create(data){

        const database = await connectMongo();
        const now = new Date();

        const inspection = {
            ...data,
            status:data.status || "Pending",
            createdAt:now,
            updatedAt:now,
            completedAt:data.status === "Completed"
                ? now
                : null
        };

        const result = await database
            .collection("inspections")
            .insertOne(inspection);

        return {
            id:result.insertedId,
            ...inspection
        };

    }


    async updateStatus(id,status,user){

        const database = await connectMongo();
        const query = { _id:new ObjectId(id) };

        if(user.role === "Customs Officer"){
            query.officerId = user.id;
        }

        const now = new Date();
        const result = await database
            .collection("inspections")
            .findOneAndUpdate(
                query,
                {
                    $set:{
                        status,
                        updatedAt:now,
                        completedAt:status === "Completed"
                            ? now
                            : null
                    }
                },
                { returnDocument:"after" }
            );

        return result.value || result;

    }

}
