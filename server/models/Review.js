const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  userId: {
      type: String,
      ref: 'User',
      required: true
  },
  restaurantId: {
    type: String,
    ref: 'Restaurant',
  }
});

const Review = model('Review', reviewSchema);

module.exports = Review;
