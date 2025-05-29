const { sendErrorResponse } = require("../helpers/send_error_response");
const User_role = require("../models/user-role.model");
const Role = require("../models/role.model");

const add = async (req, res) => {
  try {
    const { name, userId, roleId } = req.body;
    const newUser_role = await User_role.create({ name, userId, roleId });
    res.status(201).send({ message: "New User_role created!", newUser_role });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const user_roles = await User_role.findAll({
      include: [
        {
          model: Role,
          attributes: ["name", "description"],
        },
      ],
      attributes: ["id", "userId", "roleId"],
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
