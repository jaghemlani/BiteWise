const mongoose = require('mongoose');
const db = require('../config/connection');
const { User, Restaurant, Review } = require('../models');
const data = require('./Data.json');

const cleanDB = async (collectionName) => {
  try {
    const connection = mongoose.connection;
    const collections = await connection.db.listCollections({ name: collectionName }).toArray();

    if (collections.length) {
      await connection.db.dropCollection(collectionName);
      console.log(`Dropped collection: ${collectionName}`);
    } else {
      console.log(`Collection ${collectionName} does not exist, skipping drop.`);
    }
  } catch (err) {
    console.error(`Error dropping collection ${collectionName}:`, err);
    throw err;
  }
};

db.once('open', async () => {
  try {
    // Clean the database
    await cleanDB('users');
    await cleanDB('reviews');
    await cleanDB('restaurants');

    // Insert users and restaurants
    const insertedUsers = await User.insertMany(data.users);
    const insertedRestaurants = await Restaurant.insertMany(data.restaurants);

    // Log the inserted users and restaurants for debugging
    console.log('Inserted Users:', insertedUsers);
    console.log('Inserted Restaurants:', insertedRestaurants);

    // Map reviews with correct userId and restaurantId
    const reviews = data.reviews.map(review => {
      const user = insertedUsers.find(user => user.username === review.userId);
      const restaurant = insertedRestaurants.find(restaurant => restaurant.name === review.restaurantId);

      if (!user) {
        throw new Error(`User not found: ${review.userId}`);
      }
      if (!restaurant) {
        throw new Error(`Restaurant not found: ${review.restaurantId}`);
      }

      return {
        ...review,
        userId: user._id,
        restaurantId: restaurant._id
      };
    });

    // Insert reviews
    const insertedReviews = await Review.insertMany(reviews);

    // Log the inserted reviews for debugging
    console.log('Inserted Reviews:', insertedReviews);

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
});
