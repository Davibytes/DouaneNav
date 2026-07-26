export class UserRepository {

    constructor(database){

        this.collection =
            database.collection("users");

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

}