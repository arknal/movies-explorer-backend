const Movie = require('../models/movie');

const { okStatusCode } = require('../utils/consts');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

const movieController = {
  createMovie(req, res, next) {
    const id = req.user._id;

    Movie.create({
      ...req.body,
      owner: id,
    })
      .then((movie) => res.status(okStatusCode).send({ movie }))
      .catch((e) => {
        if (e.name === 'ValidationError') {
          next(new BadRequestError('Ошибка. Некорректные данные'));
        } else {
          next(e);
        }
      });
  },

  getMovies(req, res, next) {
    Movie.find({ owner: req.user._id })
      .then((movies) => res.status(okStatusCode).send({ movies }))
      .catch(next);
  },

  deleteMovie(req, res, next) {
    Movie.findById(req.params.movieId)
      .orFail(new NotFoundError('Ошибка. Фильм не найден'))
      .then((movie) => {
        if (!(movie.owner.toString() === req.user._id)) {
          throw new ForbiddenError('Доступ запрещен');
        }
        return movie.remove();
      })
      .then(() => {
        res.status(okStatusCode).send({ message: 'Фильм успешно удален' });
      })
      .catch((e) => {
        if (e.name === 'CastError') {
          next(new BadRequestError('Ошибка. Некорректный id фильма'));
        } else {
          next(e);
        }
      });
  },
};

module.exports = movieController;
