const categoryService = require('../services/categoryService');

const newCategory = async (req, res) => {
  const { name } = req.body;
  const category = await categoryService.newCategory({ name });
  res.status(201).json(category);
};

const allCategories = async (_req, res) => {
  const categories = await categoryService.allCategories();
  res.status(200).json(categories);
};

module.exports = {
  newCategory,
  allCategories,
};