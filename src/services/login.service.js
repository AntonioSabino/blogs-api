const { User } = require('../database/models');
const generateJWT = require('../util/generateJWT');

const validateLogin = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  if (!user) return null;

  return user;
};

const validateToken = async (user) => {
  const userData = user.dataValues;

  const { password: passDB, ...userWithoutPass } = userData;

  const token = generateJWT(userWithoutPass);

  return token;
};

module.exports = { validateLogin, validateToken };
