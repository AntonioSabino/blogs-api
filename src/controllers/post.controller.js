const Post = require('../services/post.service');
const Category = require('../services/categories.service');

const createPost = async (req, res, next) => {
  try {
    const { categoryIds } = req.body;
    const userId = req.user.data.id;

    const isValidCategories = await Category.validateCategories(categoryIds);

    if (!isValidCategories.length) {
      next({ status: 400, message: '"categoryIds" not found' });
    }

    const newPost = await Post.createPost(req.body, userId);

    return res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (_req, res, next) => {
  try {
    const posts = await Post.getAllPosts();

    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.getPostById(id);

    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.data.id;

    const updatedPost = await Post.updatePost(id, title, content, userId);

    if (!updatedPost) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    const post = await Post.getPostById(id);

    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.data.id;

    const hasPost = await Post.getPostById(id);

    if (!hasPost) {
      return res.status(404).json({ message: 'Post does not exist' });
    }

    const destroy = await Post.deletePost(id, userId);

    if (!destroy) return res.status(401).json({ message: 'Unauthorized user' });

    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const searchTerm = async (req, res, next) => {
  try {
    const { q } = req.query;

    const foundPost = await Post.searchTerm(q);

    return res.status(200).json(foundPost);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchTerm,
};
