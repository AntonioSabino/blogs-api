const { Category } = require('../database/models');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const category = await Category.create({ name });

  return res.status(201).json(category);
};

const getCategories = async (_req, res) => {
  const categories = await Category.findAll();

  return res.status(200).json(categories);
};

module.exports = { createCategory, getCategories };
