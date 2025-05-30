const { sendErrorResponse } = require("../helpers/send_error_response");
const Contract = require("../models/contract.model");
const Status = require("../models/status.model");

const add = async (req, res) => {
  try {
    const { name } = req.body;
    const newStatus = await Status.create({ name });
    res.status(201).send({ message: "New status created!", newStatus });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await Status.findAll({
      include: [
        {
          model: Contract,
          attributes: ["total_price", "date", "machineId", "total_time"],
        },
      ],
      attributes: ["id", "name"],
    });
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const categories = await Status.findByPk(id);
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    const categories = await Status.destroy({ where: { id } });
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  try {
    const categories = await Status.update(
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
