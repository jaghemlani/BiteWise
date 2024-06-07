const mongoose = require('mongoose');
const db = require('../config/connection');
const { User, Restaurant, Review } = require('../models');
const data = require('./data.json');

db.once('open', async () => {
  try {
    // Clean the database
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await Review.deleteMany({});

    // Insert users and restaurants
    const insertedUsers = await User.insertMany(data.users);
    const insertedRestaurants = await Restaurant.insertMany(data.restaurants);

    // Map reviews with correct userId and restaurantId
    const reviews = data.reviews.map(review => {
      const user = insertedUsers.find(user => user.username === review.userId);
      const restaurant = insertedRestaurants.find(restaurant => restaurant.name === review.restaurantId);
      return {
        ...review,
        userId: user._id,
        restaurantId: restaurant._id
      };
    });

    // Insert reviews
    await Review.insertMany(reviews);

    console.log('Data seeded successfully!');
    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    mongoose.connection.close();
    process.exit(1);
  }
});
