const { User } = require('../database/models');
const generateJWT = require('../util/generateJWT');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await User.create({ displayName, email, password, image });

  const userData = user.dataValues;

  const { password: passDB, ...userWithoutPass } = userData;

  const token = generateJWT(userWithoutPass);

  return res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return res.status(200).json(users);
};

module.exports = { createUser, getAllUsers };
