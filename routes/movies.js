const router = require('express').Router();

const { createMovie, getMovies, deleteMovie } = require('../controllers/movie');

const { movieRouterValidation } = require('../middlewares/validation');

router.get('/movies', getMovies);

router.post('/movies', movieRouterValidation.createMovieValidation, createMovie);

router.delete('/movies/:movieId', movieRouterValidation.deleteMovieValidation, deleteMovie);

module.exports = router;
