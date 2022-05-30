const express = require('express');
const {
  createUser,
  getAllUsers,
  getUserById,
} = require('../controllers/user.controller');
const authToken = require('../middleware/authToken');
const validateNewUser = require('../middleware/validateNewUser');

const router = express.Router();

router.post('/', validateNewUser, createUser);

router.get('/', authToken, getAllUsers);

router.get('/:id', authToken, getUserById);

router.delete('/me', authToken);

module.exports = router;
