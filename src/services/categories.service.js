const { Category } = require('../database/models');

const createCategory = async (name) => {
  const category = await Category.create({ name });

  return category;
};

const getCategories = async () => {
  const categories = await Category.findAll();

  return categories;
};

const validateCategories = async (categoryIds) => {
  const isValidCategories = await Category.findAll({
    where: { id: categoryIds },
  });

  return isValidCategories;
};

module.exports = { createCategory, getCategories, validateCategories };
