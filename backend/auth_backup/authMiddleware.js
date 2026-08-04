export const createAuthMiddleware = (authService) => {
  return (req, res, next) => {
    try {
      const authorization = req.headers.authorization;

      const authentication = authService.authenticate(authorization);

      req.user = authentication.user;
      req.claims = authentication.claims;

      return next();
    } catch (error) {
      const status = error.statusCode || 401;

      res.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8'
      });

      return res.end(JSON.stringify({
        error: error.message || 'Unauthorized.'
      }));
    }
  };
};