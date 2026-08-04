const clientIp = (req) =>
  req.headers["x-forwarded-for"]?.split(",")[0].trim()
  ||
  req.socket.remoteAddress
  ||
  "unknown";



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





export const createAuthController = (
  service
) => ({



  async login(
    req,
    res,
    credentials
  ) {


    console.log(
      "LOGIN RECEIVED:",
      credentials
    );



    try {


      const result =
        await service.login(
          credentials,
          clientIp(req)
        );



      console.log(
        "LOGIN SUCCESS:",
        result.user
      );



      return reply(
        res,
        200,
        result
      );


    }

    catch(error){


      console.log(
        "LOGIN ERROR:",
        error.message
      );


      throw error;


    }


  },







  async logout(
    req,
    res
  ){


    await service.logout(
      req.headers.authorization,
      clientIp(req)
    );



    return reply(
      res,
      204,
      {}
    );


  },







  async me(
    req,
    res
  ){



    const {
      user
    } =
      await service.authenticate(
        req.headers.authorization
      );



    return reply(
      res,
      200,
      {
        user
      }
    );


  }



});