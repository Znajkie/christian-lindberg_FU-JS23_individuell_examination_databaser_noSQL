const mongoose = require('mongoose');

const movieSchema = mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    director: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    genre: { type: String, required: true },
  }, { versionKey: false });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
