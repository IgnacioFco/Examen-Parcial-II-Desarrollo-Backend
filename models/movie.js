const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 150
  },
  director: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1888, // primeros films
    max: new Date().getFullYear()
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  durationMinutes: {
    type: Number,
    required: true,
    min: 1
  },
  country: {
    type: String,
    default: 'Unknown'
  },
  tags: {
    type: [String],
    default: ['terror']
  },
  synopsis: {
    type: String,
    maxlength: 2000
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

movieSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Movie', movieSchema);
