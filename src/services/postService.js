const { BlogPost } = require('../models');
const { PostCategory } = require('../models');
const { User } = require('../models');
const { Category } = require('../models');

const newPost = async (title, content, userId, categoryIds) => {
  const post = await BlogPost.create({ 
    title, content, userId, published: new Date(), updated: new Date() });
  await Promise.all(categoryIds.map((categoryId) => {
    PostCategory.create({ postId: post.id, categoryId });
    return post;
  }));
  return post;
};

const allPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

module.exports = {
  newPost,
  allPosts,
};