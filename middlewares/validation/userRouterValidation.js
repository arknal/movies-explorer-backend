const { celebrate, Joi } = require('celebrate');

module.exports.patchProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30),
    email: Joi
      .string()
      .required()
      .min(2)
      .max(30)
      .email(),
  }),
});
