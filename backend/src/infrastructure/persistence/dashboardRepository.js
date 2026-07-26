import { connectMongo } from "../database/mongo.js";

export class DashboardRepository {

    async getDashboardData(){

        const database =
            await connectMongo();


        const declarations =
            await database
                .collection("declarations")
                .find({})
                .toArray();


        const inspections =
            await database
                .collection("inspections")
                .find({})
                .toArray();


        const alerts =
            await database
                .collection("alerts")
                .find({})
                .toArray();


        const synchronizationLogs =
            await database
                .collection("synchronization_logs")
                .find({})
                .toArray();



        let activeUserCount = 0;


        if(
            database
                .listCollections()
        ){


            activeUserCount =
                await database
                    .collection("users")
                    .countDocuments({
                        active:true
                    });

        }



        return {

            declarations,

            inspections,

            alerts,

            synchronizationLogs,

            activeUserCount

        };

    }

}