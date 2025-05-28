const { sendErrorResponse } = require("../helpers/send_error_response");
const Category = require("../models/category.model");
const Machine = require("../models/machine.models");
const Region = require("../models/region.model");
const Users = require("../models/users.model");
const Image = require("../models/image.models");

const add = async (req, res) => {
  try {
    const {
      name,
      price_per_hour,
      description,
      is_available,
      created_at,
      min_hour,
      min_price,
      categoryId,
      userId,
      regionId,
    } = req.body;

    const IfExists = await Category.findByPk(categoryId);
    if (!IfExists) {
      return sendErrorResponse({ message: "Bunday mavjud emas" }, res, 400);
    }

    const newMachine = await Machine.create({
      name,
      price_per_hour,
      description,
      is_available,
      created_at,
      min_hour,
      min_price,
      categoryId,
      userId,
      regionId,
    });
    res.status(201).send({ message: "New machine created!", newMachine });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const machines = await Machine.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
        {
          model: Users,
          attributes: ["full_name", "phone"],
        },
        {
          model: Region,
          attributes: ["name"],
        },
        {
          model: Image,
          attributes: ["image_url", "uploaded_at"],
        },
      ],
      attributes: [
        "id",
        "name",
        "price_per_hour",
        "description",
        "is_available",
        "created_at",
        "min_hour",
        "min_price",
      ],
    });
    res.status(200).send(machines);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const machines = await Machine.findByPk(id);
    res.status(200).send(machines);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    const machines = await Machine.destroy({ where: { id } });
    res.status(200).send(machines);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  try {
    const machines = await Machine.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send(machines);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = { add, getAll, getById, remove, update };
