const Joi = require('joi');
const { User } = require('../database/models');

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

  const user = await User.findOne({ where: { email } });

  if (user) {
    next({ status: 409, message: 'User already registered' });
  }

  next();
};

module.exports = validateNewUser;
