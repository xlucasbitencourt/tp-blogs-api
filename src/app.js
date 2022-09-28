const express = require('express');
const userController = require('./controllers/userController');
const userValidation = require('./middlewares/userValidation');
const tokenFile = require('./middlewares/tokenFile');
const categoryController = require('./controllers/categoryController');
const categoryValidation = require('./middlewares/categoryValidation');

// ...

const app = express();

app.use(express.json());

app.post('/login', userValidation.login, userController.login);
app.post('/user', userValidation.validation, userValidation.checkEmail, userController.newUser);
app.get('/user', tokenFile.tokenValidation, userController.allUsers);
app.get('/user/:id', tokenFile.tokenValidation, userController.userById);

app.post(
  '/categories',
  tokenFile.tokenValidation,
  categoryValidation.validation,
  categoryController.newCategory,
);
app.get('/categories', tokenFile.tokenValidation, categoryController.allCategories);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
