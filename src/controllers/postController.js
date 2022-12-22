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

const getById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getById(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await postService.updatePost({ id, title, content });
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  res.status(200).json(post);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await postService.deletePost(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  res.status(204).json();
};

module.exports = {
  newPost,
  allPosts,
  getById,
  updatePost,
  deletePost,
};