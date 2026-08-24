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
            .find(
                query,
                {
                    projection:{
                        photos:0,
                        declaration:0
                    }
                }
            )
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


    async updateInspection(id,data,user){

        const database = await connectMongo();
        const query = { _id:new ObjectId(id) };

        if(user.role === "Customs Officer"){
            query.officerId = user.id;
        }

        const now = new Date();
        const status = data.status;
        const updates = {
            updatedAt:now
        };

        for (const field of [
            "truckPlate",
            "comments",
            "photos",
            "location",
            "status"
        ]) {

            if (data[field] !== undefined) {
                updates[field] = data[field];
            }

        }

        if (status === "Completed") {
            updates.completedAt = now;
        }

        const result = await database
            .collection("inspections")
            .findOneAndUpdate(
                query,
                {
                    $set:{
                        ...updates
                    }
                },
                { returnDocument:"after" }
            );

        return result.value || result;

    }

}
