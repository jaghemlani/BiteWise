const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  avgReview: String
});


const Restaurant = model ('Restaurant', restaurantSchema);

module.exports = Restaurant;
