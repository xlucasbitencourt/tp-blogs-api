module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      foreignKey: 'categoryId',
      as: 'blogPost' 
    });
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      foreignKey: 'postId',
      as: 'category' 
    });
  };

  return PostCategory;
};