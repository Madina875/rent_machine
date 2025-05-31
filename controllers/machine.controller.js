const { sendErrorResponse } = require("../helpers/send_error_response");
const Category = require("../models/category.model");
const Machine = require("../models/machine.models");
const Region = require("../models/region.model");
const Users = require("../models/users.model");
const Image = require("../models/image.models");
const Review = require("../models/review.model");
const Contract = require("../models/contract.model");
const District = require("../models/district.model");

const add = async (req, res) => {
  try {
    const {
      name,
      price_per_hour,
      description,
      is_available,
      created_at,
      categoryId,
      userId,
      regionId,
      districtId,
      min_hour,
      min_price,
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
      categoryId,
      userId,
      regionId,
      districtId,
      min_hour,
      min_price,
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
          attributes: ["id", "full_name", "phone"],
        },
        {
          model: Region,
          attributes: ["name"],
        },
        {
          model: District,
          attributes: ["name"],
        },
        {
          model: Image,
          attributes: ["image_url", "uploaded_at"],
        },
        {
          model: Review,
          attributes: ["rating", "comment", "created_at"],
        },
        {
          model: Contract,
          attributes: [
            "id",
            "total_price",
            "date",
            "userId",
            "statusId",
            "start_time",
            "end_time",
            "total_time",
          ],
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
