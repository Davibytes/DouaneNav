import { MongoClient } from 'mongodb';

let client;
let database;


export const connectMongo = async () => {

  if (database) {
    return database;
  }


  const uri = process.env.MONGODB_URI;


  if (!uri) {
    throw new Error(
      'MONGODB_URI is not defined.'
    );
  }


  client = new MongoClient(uri);


  try {

    await client.connect();


    database = client.db();


    console.log(
      'MongoDB connected successfully.'
    );


    return database;


  } catch(error) {


    console.error(
      'MongoDB connection failed:',
      error.message
    );


    throw error;

  }

};



export const getMongoDatabase = () => {

  if (!database) {

    throw new Error(
      'MongoDB is not connected yet.'
    );

  }


  return database;

};



export const closeMongo = async () => {


  if (client) {


    await client.close();


    client = undefined;

    database = undefined;


  }


};