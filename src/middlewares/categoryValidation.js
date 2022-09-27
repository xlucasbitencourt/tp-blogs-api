const categoryService = require('../services/categoryService');

const validation = async (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });

  const check = await categoryService.getByName(name);
  if (check) return res.status(400).json({ message: 'Category already exists' });
  return next();
};

module.exports = {
  validation,
};