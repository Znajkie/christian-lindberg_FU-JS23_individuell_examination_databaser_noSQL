const mongoose = require('mongoose');
const Review = require('../models/reviewSchema');
const Movie = require('../models/movieSchema');
const User = require('../models/userSchema');

//* POST review
exports.postReview = async (req, res) => {
  try {
    const { movieId, userId, rating, comment } = req.body;

    // Validate movieId
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).send('Movie not found');
    }

    // Validate userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const newReview = new Review({
      movieId,
      userId,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).send(newReview);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//* GET all review
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    if (!reviews) {
      res.status(400).send('No reviews found');
      return;
    }
    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send(error);
  }
};

//* Get review by ID
exports.getReviewById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).send('Not valid ID');
      return;
    }

    const review = await Review.findById(req.params.id);
    if (!review) {
      res.status(404).send('Review not found');
      return;
    }
    res.status(200).send(review);
  } catch (error) {
    console.error('Error in getReviewById:', error);
    res.status(500).send(error);
  }
};

//* Update review
exports.updateReview = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['rating', 'comment'];
  const isValidKeys = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidKeys) {
    res.status(400).send('Invalid update fields');
    return;
  }
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      res.status(404).send('Review not found');
      return;
    }
    updates.forEach((update) => (review[update] = req.body[update]));
    await review.save();
    res.status(200).send(`Review updated: ${review}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

//* Delete review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      res.status(400).send('Review not found');
      return;
    }
    res.status(200).send(`Review deleted: ${review}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};