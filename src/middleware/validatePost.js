const Joi = require('joi');
const { Category } = require('../database/models');

const schema = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
});

const validateTitleAndContent = (req, _res, next) => {
  const { title, content } = req.body;
  const { error } = schema.validate({ title, content });

  if (error) {
    next({ status: 400, message: 'Some required fields are missing' });
  }

  next();
};

const validateCategories = async (req, _res, next) => {
  const { categoryIds } = req.body;

  const isValidCategories = await Category.findAll({
    where: { id: categoryIds },
  });

  if (!isValidCategories.length) {
    next({ status: 400, message: '"categoryIds" not found' });
  }

  next();
};

module.exports = { validateTitleAndContent, validateCategories };
