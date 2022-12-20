const mongoose = require('mongoose');

const { urlRegEx } = require('../utils/consts');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: { validator: (v) => v.match(urlRegEx) },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: { validator: (v) => v.match(urlRegEx) },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: { validator: (v) => v.match(urlRegEx) },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
