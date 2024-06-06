const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  avgReview: {
    type: String
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
