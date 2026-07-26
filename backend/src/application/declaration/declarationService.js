const allowedRoles = new Set([
  "Administrator",
  "Customs Officer",
  "Mobile Brigade",
  "Supervisor"
]);


export const createDeclarationService = (repository) => ({


  async getDeclarations(user) {


    if (!allowedRoles.has(user.role)) {

      throw Object.assign(
        new Error(
          "You are not authorized to view declarations."
        ),
        {
          statusCode: 403
        }
      );

    }


    return await repository.findAll();

  },



  async getDeclarationById(user, id) {


    if (!allowedRoles.has(user.role)) {

      throw Object.assign(
        new Error(
          "You are not authorized to view declarations."
        ),
        {
          statusCode: 403
        }
      );

    }


    const declaration =
      await repository.findById(id);



    if (!declaration) {

      throw Object.assign(
        new Error(
          "Declaration not found."
        ),
        {
          statusCode: 404
        }
      );

    }


    return declaration;

  },



  async searchDeclarations(user, query) {


    if (!allowedRoles.has(user.role)) {

      throw Object.assign(
        new Error(
          "You are not authorized to search declarations."
        ),
        {
          statusCode: 403
        }
      );

    }



    if (!query) {

      return [];

    }



    return await repository.search(query);

  }


});