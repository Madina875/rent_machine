const { sendErrorResponse } = require("../helpers/send_error_response");
const District = require("../models/district.model");

const add = async (req, res) => {
  try {
    const { name } = req.body;
    const newDistrict = await District.create({ name });
    res.status(201).send({ message: "New district created!", newDistrict });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await District.findAll();
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const categories = await District.findByPk(id);
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    const categories = await District.destroy({ where: { id } });
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  try {
    const categories = await District.update(
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
