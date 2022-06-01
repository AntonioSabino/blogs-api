const Sequelize = require('sequelize');
const { BlogPost, User, Category } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const createPost = async (body, userId) => {
    const { title, content, categoryIds } = body;

    const newPost = await sequelize.transaction(async (t) => {
      const post = await BlogPost.create({ title, content, userId }, { t });

      await post.addCategory(categoryIds, { t });
      return post;
    });

    return newPost;
};

const getAllPosts = async () => {
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return posts;
};

const getPostById = async (id) => {
    const post = await BlogPost.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    if (!post) return null;

    return post;
};

const updatePost = async (id, title, content, userId) => {
    const [updatedPost] = await BlogPost.update(
      { title, content },
      { where: { id, userId } },
    );

    if (!updatedPost) return null;

    return updatedPost;
};

const deletePost = async (id, userId) => {
    const destroy = await BlogPost.destroy({ where: { id, userId } });

    return destroy;
};

const searchTerm = async (q) => {
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

    return foundPost;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchTerm,
};
