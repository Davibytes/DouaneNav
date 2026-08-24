import { connectMongo } from "../database/mongo.js";

export class DashboardRepository {

    async getDashboardData(){

        const database =
            await connectMongo();


        const [
            declarations,
            inspections,
            alerts,
            synchronizationLogs,
            activeUserCount
        ] = await Promise.all([
            database.collection("declarations").find({}).toArray(),
            database.collection("inspections").find(
                {},
                {
                    projection:{
                        photos:0,
                        declaration:0
                    }
                }
            ).toArray(),
            database.collection("alerts").find({}).toArray(),
            database.collection("synchronization_logs").find({}).toArray(),
            database.collection("users").countDocuments({ active:true })
        ]);



        return {

            declarations,

            inspections,

            alerts,

            synchronizationLogs,

            activeUserCount

        };

    }

}
