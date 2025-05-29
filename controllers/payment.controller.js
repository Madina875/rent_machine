const { sendErrorResponse } = require("../helpers/send_error_response");
const Payment = require("../models/payment.model");

const add = async (req, res) => {
  try {
    const { payment_date, payment_status, amount, status } = req.body;
    const newPayment = await Payment.create({
      payment_date,
      payment_status,
      amount,
      status,
    });
    res.status(201).send({ message: "New payment created!", newPayment });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const paymentses = await Payment.findAll();
    res.status(200).send(paymentses);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const paymentses = await Payment.findByPk(id);
    res.status(200).send(paymentses);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    const paymentses = await Payment.destroy({ where: { id } });
    res.status(200).send(paymentses);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  try {
    const paymentses = await Payment.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send(paymentses);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = { add, getAll, getById, remove, update };
