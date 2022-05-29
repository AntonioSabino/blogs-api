const express = require('express');

const router = express.Router();

router.post('/');

router.get('/');

router.get('/:id');

router.put('/:id');

router.delete('/:id');

router.get('/search?q=:searchTerm');

module.exports = router;
