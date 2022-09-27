const userService = require('../services/userService');
const token = require('../middlewares/tokenFile');

const login = async (req, res) => {
  const user = await userService.loginUser(req.body);
  if (!user) return res.status(400).json({ message: 'Invalid fields' });
  const result = token(req.body);
  res.status(200).json({ token: result });
};

const newUser = async (req, res) => {
  try {
    const user = await userService.newUser(req.body);
    const result = token(user);
    return res.status(201).json({ token: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

module.exports = {
  login,
  newUser,
};