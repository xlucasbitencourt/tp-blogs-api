const categoryService = require('../services/categoryService');

const newCategory = async (req, res) => {
  const { name } = req.body;
  const category = await categoryService.newCategory({ name });
  res.status(201).json(category);
};

module.exports = {
  newCategory,
};