const express = require('express');
const { createCategory } = require('../controllers/categories.controller');
const authToken = require('../middleware/authToken');
const validateCategory = require('../middleware/validateCategory');

const router = express.Router();

router.post('/', authToken, validateCategory, createCategory);

router.get('/', authToken);

module.exports = router;
