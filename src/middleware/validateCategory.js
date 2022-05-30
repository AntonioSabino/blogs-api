const Joi = require('joi');

const schema = Joi.object({
  name: Joi.required(),
});

const validateCategory = (req, _res, next) => {
  const { name } = req.body;

  const { error } = schema.validate({ name });

  if (error) {
    next({ status: 400, message: error.message });
  }
  next();
};

module.exports = validateCategory;
