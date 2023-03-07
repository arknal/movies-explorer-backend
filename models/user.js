const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { emailRegEx } = require('../utils/consts');

function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError('Неправильные почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
        }

        return user;
      }));
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: { validator: (v) => v.match(emailRegEx) },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
