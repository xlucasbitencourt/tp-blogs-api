const { Category } = require('../models');

const newCategory = async ({ name }) => {
  const category = await Category.create({ name });

  return category;
};

const getByName = async (name) => {
  const category = await Category.findOne({ where: { name } });
  return category;
};

const allCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

/*
const getById = async (id) => {
  const category = await Category.findByPk(id);
  return category;
};
*/

module.exports = {
  newCategory,
  getByName,
  allCategories,
  // getById,
};