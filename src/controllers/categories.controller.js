const { Category } = require('../database/models');

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = await Category.create({ name });

    return res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const getCategories = async (_req, res, next) => {
  try {
    const categories = await Category.findAll();

    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCategory, getCategories };
