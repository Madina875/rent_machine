const { sendErrorResponse } = require("../helpers/send_error_response");
const Commission = require("../models/commission.model");
// const Contract = require("../models/contract.model");

const add = async (req, res) => {
  try {
    const { percent } = req.body;
    const newCommission = await Commission.create({ percent });
    res.status(201).send({ message: "New commission created!", newCommission });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await Commission
      .findAll
      //   {
      //   include: [
      //     {
      //       model: Contract,
      //       attributes: ["total_price", "date", "machineId", "total_time"],
      //     },
      //   ],
      //   attributes: ["id", "percent"],
      // }
      ();
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const categories = await Commission.findByPk(id);
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    const categories = await Commission.destroy({ where: { id } });
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
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
    sendErrorResponse(error, res, 400);
  }
};

module.exports = { add, getAll, getById, remove, update };
