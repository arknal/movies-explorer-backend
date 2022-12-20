const { celebrate, Joi } = require('celebrate');
const { urlRegEx } = require('../../utils/consts');

module.exports.createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegEx),
    trailerLink: Joi.string().required().pattern(urlRegEx),
    thumbnail: Joi.string().required().pattern(urlRegEx),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi
      .string()
      .alphanum()
      .length(24)
      .required()
      .hex(),
  }),
});
