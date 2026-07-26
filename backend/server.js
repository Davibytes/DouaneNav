import './src/infrastructure/config/environment.js';

import { createServer } from 'node:http';

import { createApp } from './src/app.js';

import { connectMongo } from './src/infrastructure/database/mongo.js';



const port =
    Number(
        process.env.PORT || 5000
    );





const startServer = async () => {

    try {


        await connectMongo();




        const app =
            await createApp();




        const server =
            createServer(app);






        server.on(
            'error',
            (error) => {


                if(error.code === 'EADDRINUSE'){


                    console.error(
                        `Port ${port} is already in use.`
                    );


                    process.exitCode = 1;


                    return;

                }



                throw error;


            }
        );







        server.listen(
            port,
            "0.0.0.0",
            () => {


                console.log(
                    `DouaneNav API listening on port ${port}`
                );


                console.log(
                    `Local: http://localhost:${port}`
                );


                console.log(
                    `Network: http://192.168.137.1:${port}`
                );


            }
        );




    }
    catch(error){


        console.error(
            "Server startup failed:",
            error.message
        );


        process.exit(1);


    }


};





startServer();