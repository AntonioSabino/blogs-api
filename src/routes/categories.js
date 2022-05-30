const express = require('express');
const authToken = require('../middleware/authToken');

const router = express.Router();

router.post('/', authToken);

router.get('/', authToken);

module.exports = router;
