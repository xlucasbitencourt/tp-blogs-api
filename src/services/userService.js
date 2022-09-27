const { User } = require('../models');

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });
  return user;
};

const newUser = async ({ displayName, email, password, image }) => {
  const user = await User.create({ displayName, email, password, image });

  return user.dataValues;
};

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const allUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

module.exports = {
  loginUser,
  newUser,
  getByEmail,
  allUsers,
};