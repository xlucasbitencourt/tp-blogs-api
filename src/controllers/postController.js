const postService = require('../services/postService');

const newPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;
  const post = await postService.newPost(title, content, userId, categoryIds);
  res.status(201).json(post);
};

const allPosts = async (req, res) => {
  const posts = await postService.allPosts();
  res.status(200).json(posts);
};

module.exports = {
  newPost,
  allPosts,
};