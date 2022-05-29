const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().min(1).email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(1).required(),
});

const validateInputsLogin = (req, _res, next) => {
  const { email, password } = req.body;

  const { error } = schema.validate({ email, password });

  if (error) {
    next({ status: 400, message: 'Some required fields are missing' });
  }
  next();
};

module.exports = validateInputsLogin;
