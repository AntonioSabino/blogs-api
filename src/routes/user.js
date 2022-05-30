const express = require('express');
const { createUser } = require('../controllers/user.controller');
const validateNewUser = require('../middleware/validateNewUser');

const router = express.Router();

router.post('/', validateNewUser, createUser);

router.get('/');

router.get('/:id');

router.delete('/me');

module.exports = router;
