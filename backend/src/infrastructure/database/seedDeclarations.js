import '../config/environment.js';
import { connectMongo, closeMongo } from './mongo.js';

// Seed coordinates identify the named neighborhood/landmark, not a verified
// cargo drop-off point. Production declarations should store the exact pin.

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


        const declarationSeeds = [

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
                        latitude:4.0430,
                        longitude:9.6865
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
                        latitude:3.8847,
                        longitude:11.5034
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
                        latitude:4.0525,
                        longitude:9.6967
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
                        latitude:5.4715,
                        longitude:10.4197
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
                        latitude:4.0189,
                        longitude:9.2718
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
                        latitude:3.8257,
                        longitude:11.5169
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
                    area:"Deep-Sea Port, Mboro",
                    address:"Kribi Deep-Sea Port, Mboro, Cameroon",
                    country:"Cameroon",
                    coordinates:{
                        latitude:2.7204,
                        longitude:9.8613
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
                        latitude:9.2985,
                        longitude:13.4003
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
                        latitude:4.0944,
                        longitude:9.7394
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

        ];

        for (const declaration of declarationSeeds) {
            const existing = await declarations.findOne({
                declarationNumber: declaration.declarationNumber
            });

            if (!existing) {
                await declarations.insertOne(declaration);
            } else if (
                existing.importer?.name === declaration.importer.name
                && existing.goods?.description === declaration.goods.description
                && existing.transport?.truckPlate === declaration.transport.truckPlate
            ) {
                // Refresh only the seeded destination so updated map pins apply;
                // leave status, inspections, and other live declaration fields intact.
                await declarations.updateOne(
                    { _id: existing._id },
                    { $set: { destination: declaration.destination } }
                );
            } else {
                console.warn(
                    `Skipped ${declaration.declarationNumber}: an existing declaration uses that number.`
                );
            }
        }

        await inspections.updateOne(
            { declarationNumber: "CM2026-0002", officerId: "user-2" },
            {
                $setOnInsert: {
                    declarationNumber: "CM2026-0002",
                    officerId: "user-2",
                    officer: "Jean Mbarga",
                    status: "Pending",
                    location: "Tsinga, Yaounde, Cameroon",
                    createdAt: new Date()
                }
            },
            { upsert: true }
        );

        await alerts.updateOne(
            { type: "Delay", message: "Truck CM2026-0001 delayed on route." },
            {
                $setOnInsert: {
                    type: "Delay",
                    message: "Truck CM2026-0001 delayed on route.",
                    severity: "medium",
                    status: "active",
                    createdAt: new Date()
                }
            },
            { upsert: true }
        );

        await synchronizationLogs.updateOne(
            { action: "Initial synchronization", status: "success" },
            {
                $setOnInsert: {
                    action: "Initial synchronization",
                    status: "success",
                    createdAt: new Date()
                }
            },
            { upsert: true }
        );


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
