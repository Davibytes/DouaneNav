const reply = (
  res,
  status,
  payload
) => {

  res.writeHead(
    status,
    {
      'Content-Type':
        'application/json; charset=utf-8'
    }
  );


  res.end(
    JSON.stringify(payload)
  );

};



export const createDashboardController = (
  authService,
  dashboardService
) => ({


  async get(req, res) {


    const { user } =
      await authService.authenticate(
        req.headers.authorization
      );



    const dashboard =
      await dashboardService.getDashboard(
        user
      );



    return reply(
      res,
      200,
      dashboard
    );


  }


});