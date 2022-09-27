require('dotenv').config();
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const token = ({ email }) => {
  const pass = jwt.sign({ email }, secret, jwtConfig);

  return pass;
};

const tokenValidation = async (req, res, next) => {
  const userToken = req.header('Authorization');

  if (!userToken) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(userToken, secret);
    const check = await userService.getByEmail(decoded.email);
    if (!check) return res.status(401).json({ message: 'Expired or invalid token' });
    return next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { 
  token,
  tokenValidation,
};