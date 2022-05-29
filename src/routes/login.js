const express = require('express');
const validateInputsLogin = require('../middleware/validateInputsLogin');

const router = express.Router();

router.post('/', validateInputsLogin);

module.exports = router;
