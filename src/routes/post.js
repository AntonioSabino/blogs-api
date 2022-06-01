const express = require('express');
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
} = require('../controllers/post.controller');
const authToken = require('../middleware/authToken');
const {
  validateTitleAndContent,
  validateCategories,
} = require('../middleware/validatePost');

const router = express.Router();

router.post('/', authToken, validateTitleAndContent, validateCategories, createPost);

router.get('/', authToken, getAllPosts);

router.get('/:id', authToken, getPostById);

router.put('/:id', authToken, validateTitleAndContent, updatePost);

router.delete('/:id', authToken);

router.get('/search?q=:searchTerm', authToken);

module.exports = router;
