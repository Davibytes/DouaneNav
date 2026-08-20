import { hashPassword } from "../../domain/auth/password.js";

export class UserRepository {

    constructor(database){

        this.collection =
            database.collection("users");

        this.roles =
            database.collection("roles");

    }


    async getAll(){

        return await this.collection
            .find(
                {},
                {
                    projection:{
                        passwordHash:0
                    }
                }
            )
            .toArray();

    }


    async createOfficer(data){

        const role =
            await this.roles.findOne({
                name:"Customs Officer"
            });


        if(!role){

            throw new Error(
                "Customs Officer role not found."
            );

        }


        const existingUser =
            await this.collection.findOne({
                email:data.email
            });


        if(existingUser){

            const error =
                new Error(
                    "A user with this email already exists."
                );

            error.statusCode = 409;

            throw error;

        }


        const user = {

            id:
                `user-${Date.now()}`,

            name:
                data.name,

            email:
                data.email,

            phone:
                data.phone || "",

            status:
                data.status || "active",

            roleId:
                role.id,

            passwordHash:
                hashPassword(
                    data.temporaryPassword
                ),

            mustChangePassword:
                true,

            createdAt:
                new Date(),

            updatedAt:
                new Date()

        };


        await this.collection.insertOne(
            user
        );


        return {

            id:user.id,

            name:user.name,

            email:user.email,

            phone:user.phone,

            status:user.status,

            role:role.name,

            mustChangePassword:
                true

        };

    }

}