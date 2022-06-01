const Login = require('../services/login.service');

const validateLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await Login.validateLogin(email, password);

  if (!user) return res.status(400).json({ message: 'Invalid fields' });

  const token = await Login.validateToken(user);

  res.status(200).json({ token });
};

module.exports = { validateLogin };
