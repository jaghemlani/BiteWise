const { Restaurant, Review, User } = require('../models');
const bcrypt = require('bcrypt');
const { generateToken } = require('../auth');

const resolvers = {
  Query: {
    async getRestaurant(parent, args, context, info) {
      const { _id } = args;
      return await Restaurant.findById(_id);
    },
    async getReview(parent, args, context, info) {
      const { _id } = args;
      return await Review.findById(_id);
    },
    async getUser(parent, args, context, info) {
      const { _id } = args;
      return await User.findById(_id);
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
      if(!user) {
        throw new Error('Invalid login credentials');
      }
      const correctPassword = await user.isCorrectPassword(password);
      if(!correctPassword) {
        throw new Error('Invalid login credentials');
      }
      const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
      return { token, user };
    },
    },
};

module.exports = resolvers;
