const { BlogPost } = require('../models');
const { PostCategory } = require('../models');

const newPost = async (title, content, userId, categoryIds) => {
  const post = await BlogPost.create({ 
    title, content, userId, published: new Date(), updated: new Date() });
  await Promise.all(categoryIds.map((categoryId) => {
    PostCategory.create({ postId: post.id, categoryId });
    return post;
  }));
  return post;
};

module.exports = {
  newPost,
};