const { sendErrorResponse } = require("../helpers/send_error_response");
const Users = require("../models/users.model");
const bcrypt = require("bcrypt");
const Users_location = require("../models/users_location.model");

const add = async (req, res) => {
  try {
    const { full_name, phone, email, password, confirm_password } = req.body;
    const candidate = await Users.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse(
        { message: "Bunday foydalanuvchi mavjud" },
        res,
        400
      );
    }
    if (password != confirm_password) {
      return sendErrorResponse({ message: "parollar mos emas" }, res, 400);
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUsers = await Users.create({
      full_name,
      phone,
      email,
      hashed_password,
    });
    res.status(201).send({ message: "New users created!", newUsers });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await Users.findAll({
      include: [{ model: Users_location, attributes: ["name", "address"] }],
      attributes: ["full_name", "phone"],
    });
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const categories = await Users.findByPk(id);
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    const categories = await Users.destroy({ where: { id } });
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  try {
    const categories = await Users.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = { add, getAll, getById, remove, update };
