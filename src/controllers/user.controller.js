const User = require('../services/user.service');

const createUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const registeredEmail = await User.getUserByEmail(email);

    if (registeredEmail) {
      next({ status: 409, message: 'User already registered' });
    }

    const token = await User.createUser(req.body);

    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await User.getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.getUserById(id);

    if (!user) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.user.data;

    await User.deleteUser(id);

    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, getAllUsers, getUserById, deleteUser };
