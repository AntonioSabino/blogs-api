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

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) return res.status(404).json({ message: 'User does not exist' });

  return res.status(200).json(user);
};

module.exports = { createUser, getAllUsers, getUserById };
