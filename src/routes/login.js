const express = require('express');
const { validateLogin } = require('../controllers/login.controller');
const validateInputsLogin = require('../middleware/validateInputsLogin');

const router = express.Router();

router.post('/', validateInputsLogin, validateLogin);

module.exports = router;
