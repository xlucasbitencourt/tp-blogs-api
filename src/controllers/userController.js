const userService = require('../services/userService');
const token = require('../middlewares/tokenFile');

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
  newUser,
};