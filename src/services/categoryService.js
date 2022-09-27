const { Category } = require('../models');

const newCategory = async ({ name }) => {
  const category = await Category.create({ name });

  return category;
};

const getByName = async (name) => {
  const category = await Category.findOne({ where: { name } });
  return category;
};

module.exports = {
  newCategory,
  getByName,
};