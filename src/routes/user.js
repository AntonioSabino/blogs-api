const express = require('express');
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
} = require('../controllers/user.controller');
const authToken = require('../middleware/authToken');
const validateNewUser = require('../middleware/validateNewUser');

const router = express.Router();

router.post('/', validateNewUser, createUser);

router.get('/', authToken, getAllUsers);

router.get('/:id', authToken, getUserById);

router.delete('/me', authToken, deleteUser);

module.exports = router;
