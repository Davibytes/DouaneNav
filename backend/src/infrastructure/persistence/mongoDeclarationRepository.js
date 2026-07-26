import { ObjectId } from "mongodb";


export class MongoDeclarationRepository {


    constructor(database){

        this.declarations =
            database.collection("declarations");

    }







    async findAll(){

        return await this.declarations
            .find({})
            .sort({
                createdAt:-1
            })
            .toArray();

    }







    async findById(id){


        let declaration = null;



        try {

            declaration =
                await this.declarations.findOne({
                    _id:
                        new ObjectId(id)
                });


        }
        catch{

            declaration = null;

        }



        return declaration;


    }







    async search(query){


        if(!query){

            return [];

        }



        return await this.declarations
            .find(
                {
                    $or:[

                        {
                            declarationNumber:{
                                $regex:query,
                                $options:"i"
                            }
                        },


                        {
                            importer:{
                                $regex:query,
                                $options:"i"
                            }
                        },


                        {
                            exporter:{
                                $regex:query,
                                $options:"i"
                            }
                        },


                        {
                            truckNumber:{
                                $regex:query,
                                $options:"i"
                            }
                        }

                    ]
                }
            )
            .toArray();


    }







    async create(data){


        const declaration = {


            ...data,


            status:
                data.status ||
                "pending",


            createdAt:
                new Date(),


            updatedAt:
                new Date()


        };



        const result =
            await this.declarations.insertOne(
                declaration
            );



        return {

            id:
                result.insertedId,

            ...declaration

        };


    }







    async update(id, data){


        let objectId;


        try {

            objectId =
                new ObjectId(id);

        }
        catch{

            throw new Error(
                "Invalid declaration id."
            );

        }





        const result =
            await this.declarations.findOneAndUpdate(

                {
                    _id:
                        objectId
                },


                {
                    $set:{
                        ...data,
                        updatedAt:
                            new Date()
                    }
                },


                {
                    returnDocument:
                        "after"
                }

            );



        return result.value;


    }







    async delete(id){


        return await this.declarations.deleteOne({

            _id:
                new ObjectId(id)

        });


    }

}