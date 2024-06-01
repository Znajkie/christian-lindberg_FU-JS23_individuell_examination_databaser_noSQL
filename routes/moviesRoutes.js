const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const isAdmin = require('../utils/roleCheck');

// Post /movies
router.post('/', isAdmin, moviesController.postMovie);

// Update /movies
router.put('/:id', isAdmin, moviesController.updateMovie);

// Delete /movies
router.delete('/:id', isAdmin, moviesController.deleteMovie);

// Get all movies
router.get('/', moviesController.getAllMovies);

// Get average of all the ratings on all movies.
router.get('/ratings', moviesController.getAverageMovieRatings);

// GET /movies/:id
router.get('/:id', moviesController.getMovieById);

// GET /movies/:id/reviews: Hämta alla recensioner för en specifik film.
router.get('/:id/reviews', moviesController.getReviewsForTheMovie);



module.exports = router;