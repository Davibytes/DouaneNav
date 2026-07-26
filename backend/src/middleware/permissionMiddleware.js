export const requirePermission = (permission) => {
  return (req, res, next) => {

    if (!req.user) {
      res.writeHead(401, {
        'Content-Type': 'application/json; charset=utf-8'
      });

      return res.end(JSON.stringify({
        error: 'Authentication required.'
      }));
    }


    const permissions = req.user.permissions || [];


    if (!permissions.includes(permission)) {

      res.writeHead(403, {
        'Content-Type': 'application/json; charset=utf-8'
      });

      return res.end(JSON.stringify({
        error: 'You do not have permission to perform this action.'
      }));
    }


    return next();
  };
};