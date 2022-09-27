const express = require('express');
const userController = require('./controllers/userController');
const userValidation = require('./middlewares/userValidation');

// ...

const app = express();

app.use(express.json());

app.post('/user', userValidation.validation, userValidation.checkEmail, userController.newUser);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
