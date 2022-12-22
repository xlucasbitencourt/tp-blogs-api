const express = require('express');
const userController = require('./controllers/userController');
const userValidation = require('./middlewares/userValidation');
const tokenFile = require('./middlewares/tokenFile');
const categoryController = require('./controllers/categoryController');
const categoryValidation = require('./middlewares/categoryValidation');
const postController = require('./controllers/postController');
const postValidation = require('./middlewares/postValidation');

const app = express();

app.use(express.json());

app.post('/login', userValidation.login, userController.login);
app.post('/user', userValidation.validation, userValidation.checkEmail, userController.newUser);
app.get('/user', tokenFile.tokenValidation, userController.allUsers);
app.get('/user/:id', tokenFile.tokenValidation, userController.userById);
app.delete('/user/me', tokenFile.tokenValidation, userController.deleteUser);

app.post(
  '/categories',
  tokenFile.tokenValidation,
  categoryValidation.validation,
  categoryController.newCategory,
);
app.get('/categories', tokenFile.tokenValidation, categoryController.allCategories);

app.get('/post/search', tokenFile.tokenValidation, postController.searchPost);
app.post('/post', tokenFile.tokenValidation, postValidation.validation, postController.newPost);
app.get('/post', tokenFile.tokenValidation, postController.allPosts);
app.get('/post/:id', tokenFile.tokenValidation, postController.getById);
app.put(
  '/post/:id',
   tokenFile.tokenValidation,
   postValidation.editValidation,
   postController.updatePost,
);
app.delete(
  '/post/:id',
  tokenFile.tokenValidation,
  postValidation.deleteValidation, 
  postController.deletePost,
);

module.exports = app;
