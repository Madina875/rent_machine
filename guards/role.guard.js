const { authJwtService } = require("../service/jwt.service");
const { sendErrorResponse } = require("../helpers/send_error_response");

module.exports = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      console.log(requiredRoles);
      console.log(req.user.roles);

      const userRoles = req.user.roles.map((role) => role.name);
      console.log(userRoles);

      const hasRole = requiredRoles.some((reqRole) =>
        userRoles.includes(reqRole)
      );
      if (!hasRole) {
        return sendErrorResponse(
          { message: "sizda bunday role yo'q" },
          res,
          403
        );
      }
      next();
    } catch (error) {
      sendErrorResponse(error, res, 403);
    }
  };
};
