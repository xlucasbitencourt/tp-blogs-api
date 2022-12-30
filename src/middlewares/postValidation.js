const postService = require('../services/postService');
const categoryService = require('../services/categoryService');

const checkCategory = async (categories) => {
  const allCategories = await categoryService.allCategories();
  const allCategoriesIds = allCategories.map(({ id }) => id);
  const isValid = categories.every((category) => allCategoriesIds.includes(category));
  return isValid;
};

const validation = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const valid = await checkCategory(categoryIds);

  if (!valid) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  
  next();
};

const editValidation = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const post = await postService.getById(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  if (post.userId !== userId) return res.status(401).json({ message: 'Unauthorized user' });

  next();
};

const deleteValidation = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const post = await postService.getById(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  if (post.userId !== userId) return res.status(401).json({ message: 'Unauthorized user' });

  next();
};

module.exports = { 
  validation,
  editValidation,
  deleteValidation,
};
