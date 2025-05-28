const { sendErrorResponse } = require("../helpers/send_error_response");
const Image = require("../models/image.models");

const add = async (req, res) => {
  try {
    const { image_url, uploaded_at, machine_id } = req.body;
    const newImage = await Image.create({ image_url, uploaded_at, machine_id });
    res.status(201).send({ message: "New image created!", newImage });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await Image.findAll();
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const categories = await Image.findByPk(id);
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    const categories = await Image.destroy({ where: { id } });
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  try {
    const categories = await Image.update(
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
