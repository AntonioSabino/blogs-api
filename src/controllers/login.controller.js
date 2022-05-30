const { User } = require('../database/models');

const validateLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, password } });

  if (!user) return res.status(400).json({ message: 'Invalid fields' });
};

module.exports = { validateLogin };
