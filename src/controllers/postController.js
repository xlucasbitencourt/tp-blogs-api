const postService = require('../services/postService');

const newPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;
  const post = await postService.newPost(title, content, userId, categoryIds);
  res.status(201).json(post);
};

module.exports = {
  newPost,
};