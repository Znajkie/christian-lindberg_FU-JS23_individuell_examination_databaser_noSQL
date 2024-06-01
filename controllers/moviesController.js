const mongoose = require('mongoose');
const Movie = require('../models/movieSchema');
const Review = require('../models/reviewSchema');

//*POST movie - Admin
const postMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).send({
      message: 'Created:',
      movie: newMovie,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//*UPDATE movie - Admin
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).send();
    }
      res.send({
        message: 'Updated:',
        movie: movie,
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

//*DELETE movie - Admin
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).send();
    }
    res.send({
      message: 'Deleted:',
      movie: movie});
  } catch (error) {
    res.status(400).send(error);
  }
};

//*GET all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    if (movies.length === 0) {
      res.status(404).send('No movies found');
      return;
    }
    res.status(200).send(movies);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//* GET movie by ID
const getMovieById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).send('Not valid ID');
      return;
    }

    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      res.status(404).send('Movie not found');
      return;
    }
    res.status(200).send(movie);
  } catch (error) {
    console.error('Error in getMovieById:', error);
    res.status(500).send(error.message);
  }
};
// GET revies for a movie by ID
const getReviewsForTheMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      res.status(400).send('Invalid Movie ID');
      return;
    }

    const reviews = await Review.find({ movieId });
    if (reviews.length === 0) {
      res.status(404).send('No reviews found for this movie');
      return;
    }

    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const getAverageMovieRatings = async (req, res) => {
  try {
    const moviesWithRatings = await Movie.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'movieId',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
        },
      },
      {
        $project: {
          title: 1,
          director: 1,
          releaseYear: 1,
          genre: 1,
          averageRating: 1,
        },
      },
    ]);

    res.status(200).json(moviesWithRatings);
  } catch (error) {
    console.error('Error fetching movies with average ratings:', error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  postMovie,
  updateMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
  getReviewsForTheMovie,
  getAverageMovieRatings,
};
