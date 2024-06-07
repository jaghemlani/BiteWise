const { Restaurant, Review, User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    async getRestaurant(parent, args, context, info) {
      const { id } = args;
      return await Restaurant.findById(id).populate('reviews');
    },
    async getReview(parent, args, context, info) {
      const { id } = args;
      return await Review.findById(id).populate('userId').populate('restaurantId');
    },
    async getUser(parent, args, context, info) {
      const { id } = args;
      return await User.findById(id).populate('savedReviews');
    },
    async me(parent, args, context, info) {
      if (!context.user) {
        throw new AuthenticationError('You are not authenticated');
      }
      return await User.findById(context.user._id).populate('savedReviews');
    }
  },
  Mutation: {
    async createRestaurant(parent, args, context, info) {
      const { name, address, cuisine } = args;
      return await Restaurant.create({ name, address, cuisine });
    },
    async createReview(parent, args, context, info) {
      const { comment, rating, userId, restaurantId } = args;
      const review = await Review.create({ comment, rating, userId, restaurantId });
      await Restaurant.findByIdAndUpdate(restaurantId, { $push: { reviews: review._id } });
      return review;
    },
    async createUser(parent, args, context, info) {
      const { username, email, password } = args;
      const hashedPassword = await bcrypt.hash(password, 10);
      return await User.create({ username, email, password: hashedPassword });
    },
    async loginUser(parent, args, context, info) {
      const { email, password } = args;
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Invalid login credentials');
      }
      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) {
        throw new AuthenticationError('Invalid login credentials');
      }
      const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
      return { token, user };
    },
    async saveReview(parent, { review }, context, info) {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedReviews: review } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },
    async removeReview(parent, { reviewId }, context, info) {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedReviews: reviewId } },
        { new: true }
      );
      return updatedUser;
    }
  }
};

module.exports = resolvers;
