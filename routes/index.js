const router = require('express').Router();

const { login, createUser } = require('../controllers/user');

const authMiddleware = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const userRoutes = require('./users');
const movieRoutes = require('./movies');

const { registerValidation, loginValidation } = require('../middlewares/validation');

router.post('/signin', loginValidation, login);

router.post('/signup', registerValidation, createUser);

router.use('/', authMiddleware);

router.use('/', userRoutes);

router.use('/', movieRoutes);

router.use(() => {
  throw new NotFoundError('404 Not Found');
});
module.exports = router;
