const { sendErrorResponse } = require("../helpers/send_error_response");
const User_role = require("../models/user-role.model");
const Role = require("../models/role.model");
const Users = require("../models/users.model");

const add = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const role = await User_role.findByPk(roleId);
    if (!role) {
      return sendErrorResponse(
        { message: "Bunday role mavjud emas" },
        res,
        400
      );
    }
    const user = await User_role.findByPk(userId);
    if (!user) {
      return sendErrorResponse(
        { message: "Bunday user mavjud emas" },
        res,
        400
      );
    }

    const newUser_role = await User_role.create({ userId, roleId });
    res.status(201).send({ message: "New User's role created!", newUser_role });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const user_roles = await User_role.findAll({
      include: [
        {
          model: Users,
          attributes: ["full_name"],
        },
        {
          model: Role,
          attributes: ["name"],
        },
      ],
      // attributes: ["id", "userId", "roleId"],
    });
    res.status(200).send(user_roles);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const user_roles = await User_role.findByPk(id);
    res.status(200).send(user_roles);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    const user_roles = await User_role.destroy({ where: { id } });
    res.status(200).send(user_roles);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  try {
    const user_roles = await User_role.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send(user_roles);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = { add, getAll, getById, remove, update };
