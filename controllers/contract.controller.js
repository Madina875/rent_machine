const { sendErrorResponse } = require("../helpers/send_error_response");
const Contract = require("../models/contract.model");

const add = async (req, res) => {
  try {
    const { total_price, date, start_time, end_time, total_time } = req.body;
    const newContract = await Contract.create({
      total_price,
      date,
      start_time,
      end_time,
      total_time,
    });
    res.status(201).send({ message: "New contract created!", newContract });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const contracts = await Contract.findAll();
    res.status(200).send(contracts);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const contracts = await Contract.findByPk(id);
    res.status(200).send(contracts);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    const contracts = await Contract.destroy({ where: { id } });
    res.status(200).send(contracts);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  try {
    const contracts = await Contract.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send(contracts);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = { add, getAll, getById, remove, update };
