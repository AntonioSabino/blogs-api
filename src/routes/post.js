const express = require('express');
const {
  getAllPosts,
  getPostById,
  createPost,
} = require('../controllers/post.controller');
const authToken = require('../middleware/authToken');
const validatePost = require('../middleware/validatePost');

const router = express.Router();

router.post('/', authToken, validatePost, createPost);

router.get('/', authToken, getAllPosts);

router.get('/:id', authToken, getPostById);

router.put('/:id', authToken);

router.delete('/:id', authToken);

router.get('/search?q=:searchTerm', authToken);

module.exports = router;
