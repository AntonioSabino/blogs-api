module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define("BlogPost", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  });

  BlogPost.associate = ({ User }) => {
    BlogPost.belongsTo(User, { foreignKey: "userId", as: "users" });
  };

  return BlogPost;
};
