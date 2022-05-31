const { BlogPost, User, Category } = require('../database/models');

// const createUser = async (req, res, next) => {
//   try {
//     const { displayName, email, password, image } = req.body;

//     const user = await User.create({ displayName, email, password, image });

//     const userData = user.dataValues;

//     const { password: passDB, ...userWithoutPass } = userData;

//     const token = generateJWT(userWithoutPass);

//     return res.status(201).json({ token });
//   } catch (error) {
//     next(error);
//   }
// };

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

// const getUserById = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findByPk(id, {
//       attributes: { exclude: ['password'] },
//     });

//     if (!user) return res.status(404).json({ message: 'User does not exist' });

//     return res.status(200).json(user);
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteUser = async (req, res, next) => {
//   try {
//     const { id } = req.user.data;

//     await User.destroy({ where: { id } });

//     return res.status(204).json();
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = { getAllPosts };
