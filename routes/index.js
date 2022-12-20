const router = require('express').Router();

const { login, createUser } = require('../controllers/user');

const userRoutes = require('./users');
const cardsRoutes = require('./movies');
const { registerValidation, loginValidation } = require('../middlewares/validation');

router.post('/signin', loginValidation, login);

router.post('/signup', registerValidation, createUser);

router.use('/', userRoutes);

router.use('/', cardsRoutes);

module.exports = router;
