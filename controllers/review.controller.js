const { sendErrorResponse } = require("../helpers/send_error_response");
const Review = require("../models/review.model");

const add = async (req, res) => {
  try {
    const { name, rating, comment, created_at } = req.body;
    const newReview = await Review.create({
      name,
      rating,
      comment,
      created_at,
    });
    res.status(201).send({ message: "New Review created!", newReview });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const review = await Review.findAll();
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const review = await Review.findByPk(id);
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    const review = await Review.destroy({ where: { id } });
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  try {
    const review = await Review.update(
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
