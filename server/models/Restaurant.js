const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  avgReview: String
});

module.exports = mongoose.model('Restaurant', restaurantSchema);