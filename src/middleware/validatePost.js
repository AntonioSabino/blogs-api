const Joi = require('joi');
const { Category } = require('../database/models');

const schema = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
});

const validatePost = async (req, _res, next) => {
  const { title, content, categoryIds } = req.body;
  const { error } = schema.validate({ title, content });

  if (error) {
    next({ status: 400, message: 'Some required fields are missing' });
  }

  const validateCategories = await Category.findAll({
    where: { id: categoryIds },
  });

  if (!validateCategories.length) {
    next({ status: 400, message: '"categoryIds" not found' });
  }

  next();
};

module.exports = validatePost;
