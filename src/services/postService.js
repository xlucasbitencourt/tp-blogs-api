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

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

const updatePost = async ({ id, title, content }) => {
  const post = await BlogPost.update(
    { title, content, updated: new Date() },
    { where: { id } },
  );
  console.log(post);
  return getById(id);
};

module.exports = {
  newPost,
  allPosts,
  getById,
  updatePost,
};