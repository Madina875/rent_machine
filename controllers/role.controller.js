const { sendErrorResponse } = require("../helpers/send_error_response");
const Role = require("../models/role.model");
const User_role = require("../models/user-role.model");

const add = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newRole = await Role.create({ name, description });
    res.status(201).send({ message: "New role created!", newRole });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [{ model: User_role, attributes: ["userId"] }],
      attributes: ["id", "name", "description"],
    });
    res.status(200).send(roles);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const roles = await Role.findByPk(id);
    res.status(200).send(roles);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    const roles = await Role.destroy({ where: { id } });
    res.status(200).send(roles);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  try {
    const roles = await Role.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send(roles);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = { add, getAll, getById, remove, update };
