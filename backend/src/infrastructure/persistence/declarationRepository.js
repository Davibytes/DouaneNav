import { connectMongo } from "../database/mongo.js";


export class DeclarationRepository {


  async findAll() {

    const database = await connectMongo();


    return await database
      .collection("declarations")
      .find({})
      .sort({
        createdAt: -1
      })
      .toArray();

  }



  async findById(id) {

    const database = await connectMongo();


    return await database
      .collection("declarations")
      .findOne({
        _id: id
      });

  }



  async search(query) {

    const database = await connectMongo();


    return await database
      .collection("declarations")
      .find({

        $or: [

          {
            declarationNumber: {
              $regex: query,
              $options: "i"
            }
          },


          {
            "importer.name": {
              $regex: query,
              $options: "i"
            }
          },


          {
            "destination.city": {
              $regex: query,
              $options: "i"
            }
          },


          {
            "transport.truckPlate": {
              $regex: query,
              $options: "i"
            }
          }

        ]

      })
      .toArray();

  }


}