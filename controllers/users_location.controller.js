const { sendErrorResponse } = require("../helpers/send_error_response");
const Users = require("../models/users.model");
const Users_location = require("../models/users_location.model");

const add = async (req, res) => {
  try {
    const { name, address, userId } = req.body;

    const userIfExists = await Users.findByPk(userId);

    if (!userIfExists) {
      return sendErrorResponse(
        { message: "Bunday user mavjud emas" },
        res,
        400
      );
    }

    const newUsers_location = await Users_location.create({
      name,
      address,
      userId,
    });
    res
      .status(201)
      .send({ message: "New users_location created!", newUsers_location });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const users_location = await Users_location.findAll({
      include: [
        {
          model: Users,
          attributes: ["full_name", "phone"],
        },
      ],
      attributes: ["id", "name", "address"],
    });
    res.status(200).send(users_location);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const users_location = await Users_location.findByPk(id);
    res.status(200).send(users_location);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    const users_location = await Users_location.destroy({ where: { id } });
    res.status(200).send(users_location);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  try {
    const users_location = await Users_location.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send(users_location);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = { add, getAll, getById, remove, update };
