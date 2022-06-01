const Joi = require('joi');

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).required(),
});

const validateNewUser = async (req, _res, next) => {
  const { displayName, email, password } = req.body;
  const { error } = schema.validate({ displayName, email, password });

  if (error) {
    next({ status: 400, message: error.message });
  }

  next();
};

module.exports = validateNewUser;
