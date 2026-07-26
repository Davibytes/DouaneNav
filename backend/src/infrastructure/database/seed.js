import './environment.js';

import { connectMongo } from './mongo.js';
import { MongoAuthRepository } from '../persistence/mongoAuthRepository.js';


const seed = async () => {

    try {


        const database =
            await connectMongo();



        const repository =
            new MongoAuthRepository(
                database
            );



        await repository.initialize();



        console.log(
            "MongoDB seed completed successfully."
        );



        process.exit(0);



    } catch(error) {


        console.error(
            "MongoDB seed failed:",
            error.message
        );


        process.exit(1);


    }


};



seed();