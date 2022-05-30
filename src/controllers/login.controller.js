const { User } = require('../database/models');
const generateJWT = require('../util/generateJWT');

const validateLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, password } });

  if (!user) return res.status(400).json({ message: 'Invalid fields' });

  const userData = user.dataValues;

  const { password: passDB, ...userWithoutPass } = userData;

  const token = generateJWT(userWithoutPass);

  res.status(200).json({ token });
};

module.exports = { validateLogin };
