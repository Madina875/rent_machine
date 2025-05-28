const { sendErrorResponse } = require("../helpers/send_error_response");
const Category = require("../models/category.model");

const add = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.status(201).send({ message: "New category created!", newCategory });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.status(200).send(category);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }
    await Category.destroy({ where: { id } });
    res.status(200).send({ message: "Category successfully deleted" });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).send({ message: "Category name is required" });
    }

    if (name.length > 50) {
      return res
        .status(400)
        .send({ message: "Category name must be 50 characters or less" });
    }

    const [updatedRows] = await Category.update(
      { name },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );

    if (updatedRows === 0) {
      return res.status(404).send({ message: "Category not found" });
    }

    const updatedCategory = await Category.findByPk(req.params.id);
    res.status(200).send({
      message: "Category successfully updated",
      category: updatedCategory,
    });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = { add, getAll, getById, remove, update };
