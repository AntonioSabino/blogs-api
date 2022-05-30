const { Category } = require('../database/models');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const category = await Category.create({ name });

  return res.status(201).json(category);
};

module.exports = { createCategory };
