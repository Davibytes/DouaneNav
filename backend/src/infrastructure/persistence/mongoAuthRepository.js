import { randomUUID } from "node:crypto";
import { hashPassword } from "../../domain/auth/password.js";
import { ROLE_PERMISSIONS, ROLES } from "../../domain/auth/roles.js";


export class MongoAuthRepository {


    constructor(database) {

        this.database = database;

        this.users =
            database.collection("users");

        this.roles =
            database.collection("roles");

        this.auditLogs =
            database.collection("auditLogs");

        this.revokedTokens =
            database.collection("revokedTokens");

    }





    async initialize() {

        const rolesCount =
            await this.roles.countDocuments();


        if(rolesCount === 0){


            const roles =
                Object.values(ROLES)
                .map(
                    (name, index) => ({
                        id:`role-${index + 1}`,
                        name,
                        permissions:
                            ROLE_PERMISSIONS[name]
                    })
                );


            await this.roles.insertMany(
                roles
            );


        }



        const usersCount =
            await this.users.countDocuments();


        if(usersCount === 0){


            const administrator =
                await this.roles.findOne({
                    name:
                        ROLES.ADMINISTRATOR
                });


            const officer =
                await this.roles.findOne({
                    name:
                        ROLES.CUSTOMS_OFFICER
                });


            const brigade =
                await this.roles.findOne({
                    name:
                        ROLES.MOBILE_BRIGADE
                });


            const supervisor =
                await this.roles.findOne({
                    name:
                        ROLES.SUPERVISOR
                });



            await this.users.insertMany([

                {
                    id:"user-1",
                    name:"Amina Ndi",
                    email:"admin@douanenav.cm",
                    phone:"",
                    status:"active",
                    roleId:
                        administrator.id,
                    passwordHash:
                        hashPassword(
                            "DouaneNav!2026"
                        ),
                    createdAt:
                        new Date(),
                    updatedAt:
                        new Date()
                },


                {
                    id:"user-2",
                    name:"Jean Mbarga",
                    email:"officer@douanenav.cm",
                    phone:"",
                    status:"active",
                    roleId:
                        officer.id,
                    passwordHash:
                        hashPassword(
                            "DouaneNav!2026"
                        ),
                    createdAt:
                        new Date(),
                    updatedAt:
                        new Date()
                },


                {
                    id:"user-3",
                    name:"Estelle Fongang",
                    email:"brigade@douanenav.cm",
                    phone:"",
                    status:"active",
                    roleId:
                        brigade.id,
                    passwordHash:
                        hashPassword(
                            "DouaneNav!2026"
                        ),
                    createdAt:
                        new Date(),
                    updatedAt:
                        new Date()
                },


                {
                    id:"user-4",
                    name:"Paul Tchana",
                    email:"supervisor@douanenav.cm",
                    phone:"",
                    status:"active",
                    roleId:
                        supervisor.id,
                    passwordHash:
                        hashPassword(
                            "DouaneNav!2026"
                        ),
                    createdAt:
                        new Date(),
                    updatedAt:
                        new Date()
                }

            ]);

        }

    }







    async findUserByEmail(email){

        return await this.users.findOne({
            email
        });

    }







    async findUserById(id){

        return await this.users.findOne({
            id
        });

    }







    async findRoleById(id){

        return await this.roles.findOne({
            id
        });

    }







    publicUser(
        user,
        role
    ){

        return {

            id:user.id,

            name:user.name,

            email:user.email,

            phone:user.phone,

            status:user.status,

            role:role.name,

            permissions:
                role.permissions

        };

    }







    async recordAudit(event){


        await this.auditLogs.insertOne({

            id:
                randomUUID(),

            timestamp:
                new Date(),

            ...event

        });


    }







    async revokeToken(
        jti,
        expiresAt
    ){


        await this.revokedTokens.insertOne({

            jti,

            expiresAt,

            createdAt:
                new Date()

        });


    }







    async isTokenRevoked(jti){


        const token =
            await this.revokedTokens.findOne({
                jti
            });


        return Boolean(token);


    }


}