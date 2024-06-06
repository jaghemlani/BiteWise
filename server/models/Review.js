const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' }
});


const Review = model('Review', reviewSchema);

module.exports = Review;
