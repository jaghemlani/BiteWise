const { Restaurant, Review, User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import jwt module
const { AuthenticationError } = require('apollo-server-express'); // Import AuthenticationError from apollo-server-express

const resolvers = {
  Query: {
    async getRestaurant(parent, args, context, info) {
      const { id } = args; // Destructure the id from args
      return await Restaurant.findById(id);
    },
    async getReview(parent, args, context, info) {
      const { id } = args; // Destructure the id from args
      return await Review.findById(id);
    },
    async getUser(parent, args, context, info) {
      const { id } = args; // Destructure the id from args
      return await User.findById(id);
    },
  },
  Mutation: {
    async createRestaurant(parent, args, context, info) {
      const { name, avgReview } = args;
      return await Restaurant.create({ name, avgReview });
    },
    async createReview(parent, args, context, info) {
      const { comment, rating, userId, restaurantId } = args;
      return await Review.create({ comment, rating, userId, restaurantId });
    },
    async createUser(parent, args, context, info) {
      const { username, email, password, savedReviews } = args;
      return await User.create({ username, email, password, savedReviews });
    },
    async loginUser(parent, args, context, info) {
      const { email, password } = args;
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Invalid login credentials');
      }
      const correctPassword = await bcrypt.compare(password, user.password); // Compare hashed password
      if (!correctPassword) {
        throw new AuthenticationError('Invalid login credentials');
      }
      const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
      return { token, user };
    },
  },
};

module.exports = resolvers;
