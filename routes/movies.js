const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');

const { createMovie, getAllMovies, deleteMovie } = require('../controllers/movie');

const { movieRouterValidation } = require('../middlewares/validation');

router.use('/movies', authMiddleware);

router.get('/movies', getAllMovies);

router.post('/movies', movieRouterValidation.createMovieValidation, createMovie);

router.delete('/movies/:movieId', movieRouterValidation.deleteMovieValidation, deleteMovie);

module.exports = router;
