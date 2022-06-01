const Sequelize = require('sequelize');
const { BlogPost, User, Category } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const createPost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const userId = req.user.data.id;

    const newPost = await sequelize.transaction(async (t) => {
      const post = await BlogPost.create({ title, content, userId }, { t });

      await post.addCategory(categoryIds, { t });
      return post;
    });

    return res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (_req, res, next) => {
  try {
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

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

    const [updatedPost] = await BlogPost.update(
      { title, content },
      { where: { id, userId } },
    );

    if (!updatedPost) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    const post = await getPostById(req, res, next);

    return res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.data.id;

    const hasPost = await BlogPost.findByPk(id);

    if (!hasPost) {
      return res.status(404).json({ message: 'Post does not exist' });
    }

    const destroy = await BlogPost.destroy({ where: { id, userId } });

    if (!destroy) return res.status(401).json({ message: 'Unauthorized user' });

    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const searchTerm = async (req, res, next) => {
  try {
    const { q } = req.query;

    const foundPost = await BlogPost.findAll({
      where: {
        /**
           * Código com Sequelize.Op.or consultado na aula do curso
           * https://alunos.b7web.com.br/curso/node/tipos-de-consulta-1
        */
        [Sequelize.Op.or]: {
          title: { [Sequelize.Op.substring]: q },
          content: { [Sequelize.Op.substring]: q },
        },
      },
      include: [
        { as: 'user', model: User, attributes: { exclude: ['password'] } },
        { as: 'categories', model: Category, through: { attributes: [] } },
      ],
    });

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
