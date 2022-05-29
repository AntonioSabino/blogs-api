module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    "PostCategory",
    {},
    {
      timestamps: false,
    }
  );

  PostCategory.associate = ({ BlogPost, Category }) => {
    BlogPost.belongsToMany(Category, {
      as: "posts",
      through: PostCategory,
      foreignKey: "postId",
      otherKey: "categoryId",
    });
    Category.belongsToMany(BlogPost, {
      as: "categories",
      through: PostCategory,
      foreignKey: "categoryId",
      otherKey: "postId",
    });
  };

  return PostCategory;
};
