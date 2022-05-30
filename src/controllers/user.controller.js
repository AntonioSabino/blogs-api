const { User } = require('../database/models');
const generateJWT = require('../util/generateJWT');

const createUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const user = await User.create({ displayName, email, password, image });

    const userData = user.dataValues;

    const { password: passDB, ...userWithoutPass } = userData;

    const token = generateJWT(userWithoutPass);

    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, getAllUsers, getUserById };
