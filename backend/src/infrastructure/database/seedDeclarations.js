import '../config/environment.js';
import { connectMongo, closeMongo } from './mongo.js';

const seedDeclarations = async () => {

    try {

        const database =
            await connectMongo();

        const declarations =
            database.collection("declarations");

        const inspections =
            database.collection("inspections");

        const alerts =
            database.collection("alerts");

        const synchronizationLogs =
            database.collection("synchronization_logs");


        await declarations.deleteMany({});
        await inspections.deleteMany({});
        await alerts.deleteMany({});
        await synchronizationLogs.deleteMany({});


        await declarations.insertMany([

            {
                declarationNumber:"CM2026-0001",

                importer:{
                    name:"Africa Import SARL",
                    country:"Cameroon"
                },

                goods:{
                    description:"Electronic equipment",
                    category:"Technology",
                    quantity:250
                },

                destination:{
                    city:"Douala",
                    area:"Bonanjo",
                    address:"Bonanjo, Douala, Cameroon",
                    country:"Cameroon",
                    coordinates:{
                        latitude:4.0511,
                        longitude:9.7679
                    }
                },

                transport:{
                    truckPlate:"LT-458-AA",
                    driver:"Jean Mbarga"
                },

                route:[
                    "Port Autonome de Douala",
                    "Bonaberi",
                    "Yaounde"
                ],

                status:"In Transit",

                createdAt:new Date()

            },


            {
                declarationNumber:"CM2026-0002",

                importer:{
                    name:"Cameroon Food Trading",
                    country:"Cameroon"
                },

                goods:{
                    description:"Food products",
                    category:"Agriculture",
                    quantity:500
                },

                destination:{
                    city:"Yaounde",
                    area:"Tsinga",
                    address:"Tsinga, Yaounde, Cameroon",
                    country:"Cameroon",
                    coordinates:{
                        latitude:3.8792,
                        longitude:11.5119
                    }
                },

                transport:{
                    truckPlate:"CE-902-BB",
                    driver:"Paul Tchana"
                },

                route:[
                    "Kribi Port",
                    "Edea",
                    "Yaounde"
                ],

                status:"Pending Inspection",

                createdAt:new Date()

            }

        ]);


        await inspections.insertMany([

            {
                declarationNumber:"CM2026-0002",
                officer:"Estelle Fongang",
                status:"Pending",
                location:"Tsinga, Yaounde, Cameroon",
                createdAt:new Date()
            }

        ]);


        await alerts.insertMany([

            {
                type:"Delay",
                message:"Truck CM2026-0001 delayed on route.",
                severity:"medium",
                createdAt:new Date()
            }

        ]);


        await synchronizationLogs.insertMany([

            {
                action:"Initial synchronization",
                status:"success",
                createdAt:new Date()
            }

        ]);


        console.log(
            "Declaration data seeded successfully."
        );


    }
    catch(error){

        console.error(
            "Declaration seed failed:",
            error.message
        );

    }
    finally{

        await closeMongo();

    }

};


seedDeclarations();