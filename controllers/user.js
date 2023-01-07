const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const { okStatusCode } = require('../utils/consts');

const { JWT_SECRET = 'e5941b231be3be054dcec54b7cf2f9f7', SALT = 10 } = process.env;

const userController = {
  login(req, res, next) {
    const { email, password } = req.body;
    User.findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET);

        res.status(okStatusCode).send({ token });
      })
      .catch(next);
  },
  createUser(req, res, next) {
    const { name, email, password } = req.body;
    bcrypt
      .hash(password, +SALT)
      .then((hash) => User.create({ name, email, password: hash }))
      .then((user) => {
        const { password: pw, ...info } = user.toObject();
        res.status(okStatusCode).send({ info });
      })
      .catch((e) => {
        switch (e.name) {
          case 'ValidationError':
            next(new BadRequestError('Ошибка. Некорректные данные'));
            break;
          case e.code === 11000 && 'MongoServerError':
            next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
            break;
          default:
            next(e);
            break;
        }
      });
  },
  getCurrentUser(req, res, next) {
    User.findById(req.user._id)
      .then((user) => {
        res.status(okStatusCode).send({ user });
      })
      .catch(next);
  },
  updateUserProfile(req, res, next) {
    const id = req.user._id;
    const { name, email } = req.body;

    User.findByIdAndUpdate(
      { _id: id },
      { name, email },
      { new: true, runValidators: true },
    )
      .orFail(new NotFoundError('Ошибка. Пользователь не найден'))
      .then((user) => {
        res.status(okStatusCode).send({ user });
      })
      .catch((e) => {
        switch (e.name) {
          case 'ValidationError':
            next(new BadRequestError('Ошибка. Некорректные данные'));
            break;
          case e.code === 11000 && 'MongoServerError':
            next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
            break;
          default:
            next(e);
            break;
        }
      });
  },
};

module.exports = userController;
