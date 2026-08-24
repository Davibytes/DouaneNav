import { connectMongo } from "../database/mongo.js";


export class DeclarationRepository {

  async findAll() {

    const database = await connectMongo();

    return await database
      .collection("declarations")
      .find({})
      .sort({ createdAt:-1 })
      .toArray();

  }


  async findById(id) {

    const database = await connectMongo();

    return await database
      .collection("declarations")
      .findOne({ _id:id });

  }


  async search(query) {

    const database = await connectMongo();

    return await database
      .collection("declarations")
      .find({
        $or:[
          { declarationNumber:{ $regex:query, $options:"i" } },
          { "importer.name":{ $regex:query, $options:"i" } },
          { "destination.city":{ $regex:query, $options:"i" } },
          { "transport.truckPlate":{ $regex:query, $options:"i" } }
        ]
      })
      .toArray();

  }


  async recordInspection(inspection) {

    const database = await connectMongo();
    const completed = inspection.status === "Completed";
    const result = await database
      .collection("declarations")
      .findOneAndUpdate(
        { declarationNumber:inspection.declarationNumber },
        {
          $set:{
            inspectionStatus:completed ? "inspected" : "in_progress",
            lastInspectionAt:inspection.updatedAt || inspection.createdAt,
            lastInspectedBy:inspection.officerName,
            lastInspectedById:inspection.officerId,
            updatedAt:new Date()
          },
          $inc:{ inspectionCount:1 }
        },
        { returnDocument:"after" }
      );

    return result.value || result;

  }


  async recordInspectionStatus(inspection) {

    const database = await connectMongo();
    const completed = inspection.status === "Completed";
    const result = await database
      .collection("declarations")
      .findOneAndUpdate(
        { declarationNumber:inspection.declarationNumber },
        {
          $set:{
            inspectionStatus:completed ? "inspected" : "in_progress",
            lastInspectionAt:inspection.updatedAt || new Date(),
            lastInspectedBy:inspection.officerName,
            lastInspectedById:inspection.officerId,
            updatedAt:new Date()
          }
        },
        { returnDocument:"after" }
      );

    return result.value || result;

  }

}
