const { sendErrorResponse } = require("../helpers/send_error_response");
const Commission = require("../models/commission.model");

const add = async (req, res) => {
  try {
    const { percent } = req.body;
    const newCommission = await Commission.create({ percent });
    res.status(201).send({ message: "New commission created!", newCommission });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await Commission.findAll();
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const categories = await Commission.findByPk(id);
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    const categories = await Commission.destroy({ where: { id } });
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const categories = await Commission.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = { add, getAll, getById, remove, update };
