const { authJwtService } = require("../service/jwt.service");
const { sendErrorResponse } = require("../helpers/send_error_response");

module.exports = async (req, res, next) => {
  try {
    const authorHeader = req.headers.authorization;

    if (!authorHeader) {
      return res.status(401).send({ message: "Auth header not found" });
    }

    const token = authorHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Token not found" });
    }

    const decodedToken = await authJwtService.verifyAccessToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    sendErrorResponse(error, res, 403); //403
  }
};
