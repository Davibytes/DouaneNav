const reply = (
  res,
  status,
  payload
) => {

  res.writeHead(
    status,
    {
      "Content-Type":
        "application/json; charset=utf-8"
    }
  );


  res.end(
    JSON.stringify(payload)
  );

};



export const createDeclarationController = (
  authService,
  declarationService
) => ({


  async getAll(req, res) {


    const { user } =
      await authService.authenticate(
        req.headers.authorization
      );


    const declarations =
      await declarationService.getDeclarations(
        user
      );


    return reply(
      res,
      200,
      declarations
    );

  },



  async getById(req, res, id) {


    const { user } =
      await authService.authenticate(
        req.headers.authorization
      );


    const declaration =
      await declarationService.getDeclarationById(
        user,
        id
      );


    return reply(
      res,
      200,
      declaration
    );

  },




  async search(req, res, query) {


    const { user } =
      await authService.authenticate(
        req.headers.authorization
      );


    const declarations =
      await declarationService.searchDeclarations(
        user,
        query
      );


    return reply(
      res,
      200,
      declarations
    );

  }


});