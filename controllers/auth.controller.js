const config = require("config");
const bcrypt = require("bcrypt");
const Users = require("../models/users.model");
const Role = require("../models/role.model");
const { sendErrorResponse } = require("../helpers/send_error_response");
const { authJwtService } = require("../service/jwt.service");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: { email },
      include: [
        { model: Role, attributes: ["name"], through: { attributes: [] } },
      ],
    });
    if (!user) {
      return sendErrorResponse(
        { message: "Email yoki parol notogri" },
        res,
        400
      );
    }
    verifiedPassword = await bcrypt.compare(password, user.hashed_password);
    if (!verifiedPassword) {
      return sendErrorResponse(
        { message: "Email yoki parol notogri" },
        res,
        400
      );
    }
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
    const tokens = authJwtService.generateTokens(payload);
    const hashed_token = await bcrypt.hash(tokens.refreshToken, 7);
    user.hashed_token = hashed_token;
    await user.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_time"),
      httpOnly: true,
    });
    res
      .status(200)
      .send({ message: "User logged in!", accessToken: tokens.accessToken });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "cookieda refresh token topilmadi" });
    }
    const decodedToken = await authJwtService.verifyRefreshToken(refreshToken);

    const users = await Users.update(
      { hashed_token: null },
      { where: { id: decodedToken.id }, returning: true }
    );

    if (!users) {
      return res.status(400).send({ message: "Token notogri" });
    }
    res.clearCookie("refreshToken");
    res.send({ users });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "cookieda refresh token topilmadi" });
    }
    await authJwtService.verifyRefreshToken(refreshToken);
    const user = await Users.findOne({ refresh_token: refreshToken });
    if (!user) {
      return res
        .status(401)
        .send({ message: "bazada refresh token topilmadi" });
    }
    const payload = {
      id: user._id,
      email: user.email,
    };
    const tokens = authJwtService.generateTokens(payload);
    user.refresh_token = tokens.refreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });

    res.status(201).send({
      message: "tokenlar yangilandi",
      id: user.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = { login, logout, refreshToken };
