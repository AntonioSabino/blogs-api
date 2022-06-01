const express = require('express');
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchTerm,
} = require('../controllers/post.controller');
const authToken = require('../middleware/authToken');
const {
  validateTitleAndContent,
  validateCategories,
} = require('../middleware/validatePost');

const router = express.Router();

router.post('/', authToken, validateTitleAndContent, validateCategories, createPost);

router.get('/', authToken, getAllPosts);

router.get('/search', authToken, searchTerm);

router.get('/:id', authToken, getPostById);

router.put('/:id', authToken, validateTitleAndContent, updatePost);

router.delete('/:id', authToken, deletePost);

module.exports = router;
