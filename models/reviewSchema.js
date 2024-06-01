const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  movieId: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reviewer: { type: String, require: true},
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
