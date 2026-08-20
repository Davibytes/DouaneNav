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

            },


            {
                declarationNumber:"CM2026-0003",

                importer:{
                    name:"Central Africa Electronics",
                    country:"Cameroon"
                },

                goods:{
                    description:"Computer equipment",
                    category:"Technology",
                    quantity:180
                },

                destination:{
                    city:"Douala",
                    area:"Akwa",
                    address:"Akwa, Douala, Cameroon",
                    country:"Cameroon",
                    coordinates:{
                        latitude:4.0511,
                        longitude:9.7043
                    }
                },

                transport:{
                    truckPlate:"LT-315-CC",
                    driver:"Marc Ebanda"
                },

                route:[
                    "Port Autonome de Douala",
                    "Akwa"
                ],

                status:"Pending Inspection",
                createdAt:new Date()

            },


            {
                declarationNumber:"CM2026-0004",

                importer:{
                    name:"Cameroon Agro Distribution",
                    country:"Cameroon"
                },

                goods:{
                    description:"Agricultural machinery",
                    category:"Agriculture",
                    quantity:75
                },

                destination:{
                    city:"Bafoussam",
                    area:"Centre-ville",
                    address:"Bafoussam, Cameroon",
                    country:"Cameroon",
                    coordinates:{
                        latitude:5.4781,
                        longitude:10.4172
                    }
                },

                transport:{
                    truckPlate:"LT-784-DD",
                    driver:"Eric Fongang"
                },

                route:[
                    "Douala",
                    "Nkongsamba",
                    "Bafoussam"
                ],

                status:"In Transit",
                createdAt:new Date()

            },


            {
                declarationNumber:"CM2026-0005",

                importer:{
                    name:"Atlantic Beverage Cameroon",
                    country:"Cameroon"
                },

                goods:{
                    description:"Beverages",
                    category:"Food and Beverage",
                    quantity:900
                },

                destination:{
                    city:"Limbe",
                    area:"Down Beach",
                    address:"Limbe, Cameroon",
                    country:"Cameroon",
                    coordinates:{
                        latitude:4.0249,
                        longitude:9.2032
                    }
                },

                transport:{
                    truckPlate:"LT-229-EE",
                    driver:"Patrick Talla"
                },

                route:[
                    "Port Autonome de Douala",
                    "Limbe"
                ],

                status:"Pending Inspection",
                createdAt:new Date()

            },


            {
                declarationNumber:"CM2026-0006",

                importer:{
                    name:"Yaounde Construction Supply",
                    country:"Cameroon"
                },

                goods:{
                    description:"Construction materials",
                    category:"Construction",
                    quantity:1200
                },

                destination:{
                    city:"Yaounde",
                    area:"Mvan",
                    address:"Mvan, Yaounde, Cameroon",
                    country:"Cameroon",
                    coordinates:{
                        latitude:3.8480,
                        longitude:11.5237
                    }
                },

                transport:{
                    truckPlate:"CE-441-FF",
                    driver:"Simon Njoya"
                },

                route:[
                    "Douala",
                    "Edea",
                    "Yaounde"
                ],

                status:"In Transit",
                createdAt:new Date()

            },


            {
                declarationNumber:"CM2026-0007",

                importer:{
                    name:"West Trade Logistics",
                    country:"Cameroon"
                },

                goods:{
                    description:"Textile products",
                    category:"Textiles",
                    quantity:420
                },

                destination:{
                    city:"Bamenda",
                    area:"Commercial Avenue",
                    address:"Bamenda, Cameroon",
                    country:"Cameroon",
                    coordinates:{
                        latitude:5.9631,
                        longitude:10.1591
                    }
                },

                transport:{
                    truckPlate:"NW-512-GG",
                    driver:"Daniel Mbah"
                },

                route:[
                    "Douala",
                    "Bafoussam",
                    "Bamenda"
                ],

                status:"Pending Inspection",
                createdAt:new Date()

            },


            {
                declarationNumber:"CM2026-0008",

                importer:{
                    name:"Kribi Industrial Imports",
                    country:"Cameroon"
                },

                goods:{
                    description:"Industrial spare parts",
                    category:"Industrial",
                    quantity:160
                },

                destination:{
                    city:"Kribi",
                    area:"Port Area",
                    address:"Kribi, Cameroon",
                    country:"Cameroon",
                    coordinates:{
                        latitude:2.9406,
                        longitude:9.9100
                    }
                },

                transport:{
                    truckPlate:"CE-118-HH",
                    driver:"Arnaud Etoudi"
                },

                route:[
                    "Port of Kribi",
                    "Kribi Industrial Zone"
                ],

                status:"In Transit",
                createdAt:new Date()

            },


            {
                declarationNumber:"CM2026-0009",

                importer:{
                    name:"North Cameroon Medical Supply",
                    country:"Cameroon"
                },

                goods:{
                    description:"Medical equipment",
                    category:"Healthcare",
                    quantity:95
                },

                destination:{
                    city:"Garoua",
                    area:"Centre-ville",
                    address:"Garoua, Cameroon",
                    country:"Cameroon",
                    coordinates:{
                        latitude:9.3014,
                        longitude:13.3977
                    }
                },

                transport:{
                    truckPlate:"EN-603-II",
                    driver:"Alain Issa"
                },

                route:[
                    "Douala",
                    "Yaounde",
                    "Ngaoundere",
                    "Garoua"
                ],

                status:"Pending Inspection",
                createdAt:new Date()

            },


            {
                declarationNumber:"CM2026-0010",

                importer:{
                    name:"Cameroon Household Goods",
                    country:"Cameroon"
                },

                goods:{
                    description:"Household appliances",
                    category:"Consumer Goods",
                    quantity:340
                },

                destination:{
                    city:"Douala",
                    area:"Bonamoussadi",
                    address:"Bonamoussadi, Douala, Cameroon",
                    country:"Cameroon",
                    coordinates:{
                        latitude:4.0847,
                        longitude:9.7350
                    }
                },

                transport:{
                    truckPlate:"LT-870-JJ",
                    driver:"Brice Mvondo"
                },

                route:[
                    "Port Autonome de Douala",
                    "Bonamoussadi"
                ],

                status:"In Transit",
                createdAt:new Date()

            }

        ]);


        await inspections.insertMany([

            {
                declarationNumber:"CM2026-0002",
                officerId:"user-2",
                officer:"Jean Mbarga",
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
                status:"active",
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