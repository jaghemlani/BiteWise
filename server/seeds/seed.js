const db = require('../config/connection');
const { User, Restaurant, Review } = require('../models');
const cleanDB = require('./cleanDB');
const data = require('./Data.json');



db.once('open', async () => {
  // try {
  //   // Clean the database
  //   await User.deleteMany({});
  //   await Restaurant.deleteMany({});
  //   await Review.deleteMany({});

  //   // Insert users and restaurants
  //   const insertedUsers = await User.insertMany(data.users);
  //   const insertedRestaurants = await Restaurant.insertMany(data.restaurants);

  //   // Map reviews with correct userId and restaurantId
  //   const reviews = data.reviews.map(review => {
  //     const user = insertedUsers.find(user => user.username === review.userId);
  //     const restaurant = insertedRestaurants.find(restaurant => restaurant.name === review.restaurantId);
  //     return {
  //       ...review,
  //       userId: user._id,
  //       restaurantId: restaurant._id
  //     };
  //   });

  //   // Insert reviews
  //   await Review.insertMany(reviews);

    await cleanDB("User", 'users');
    await cleanDB("Review", 'reviews');
    await cleanDB("Restaurant", 'restaurants');

    const users = await User.insertMany(data.users);
    const restaurants = await Restaurant.insertMany(data.restaurants);

    const reviews = data.reviews.map(review => {
      const user = users.find(user => user.username === review.userId);
      const restaurant = restaurants.find(restaurant => restaurant.name === review.restaurantId);

      if (!user) {
        throw new Error(`User not found: ${review.userId}`);
      }
      if (!restaurant) {
        throw new Error(`Restaurant not found: ${review.restaurantId}`);
      }

      return {
        ...review,
        author: user._id,
        restaurant: restaurant._id
      };
    });

    // Insert reviews
    await Review.insertMany(reviews);



    console.log('Data seeded successfully!');
    process.exit(0);
  
});
