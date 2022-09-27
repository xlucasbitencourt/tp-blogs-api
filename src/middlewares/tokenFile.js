require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const token = ({ email }) => {
  const pass = jwt.sign({ email }, secret, jwtConfig);

  return pass;
};

module.exports = token;