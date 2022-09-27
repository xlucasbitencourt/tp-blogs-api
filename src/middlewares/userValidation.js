const userService = require('../services/userService');

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  return next();
};

const validation = (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (displayName.length < 8) {
    return res.status(400)
    .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (!(email.match(emailRegex))) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (password.length < 6) {
    return res.status(400)
    .json({ message: '"password" length must be at least 6 characters long' });
  }

  return next();
};

const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const check = await userService.getByEmail(email);
  if (check) return res.status(409).json({ message: 'User already registered' });
  return next();
};

module.exports = {
  login,
  validation,
  checkEmail,
};