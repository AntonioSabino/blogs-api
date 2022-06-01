const { User } = require('../database/models');
const generateJWT = require('../util/generateJWT');

const getUserByEmail = async (email) => {
  const registeredEmail = await User.findOne({ where: { email } });

  return registeredEmail;
};

const createUser = async (body) => {
  const { displayName, email, password, image } = body;

  const user = await User.create({ displayName, email, password, image });

  const userData = user.dataValues;

  const { password: passDB, ...userWithoutPass } = userData;

  const token = generateJWT(userWithoutPass);

  return token;
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) return null;

  return user;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  getUserByEmail,
};
