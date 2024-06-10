const { Restaurant, Review, User } = require('../models');
const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id).populate('createdReviews').populate('savedReviews');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    users: async () => {
      return User.find().populate('createdReviews').populate('savedReviews');
    },
    getUser: async (parent, { id }) => {
      return User.findById(id).populate('createdReviews').populate('savedReviews');
    },
    getReview: async (parent, { id }) => {
      return Review.findById(id).populate('userId').populate('restaurantId');
    },
    restaurants: async () => {
      return Restaurant.find().populate('reviews');
    },
    reviews: async () => {
      return Review.find().populate('userId').populate('restaurantId');
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error(err);
        throw new Error('Error creating user');
      }
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Invalid login credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Invalid login credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    createRestaurant: async (parent, args) => {
      return Restaurant.create(args);
    },
    createReview: async (parent, args) => {
      return Review.create(args);
    },
    saveReview: async (parent, { review }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedReviews: review } },
          { new: true }
        ).populate('savedReviews');
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeReview: async (parent, { reviewId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedReviews: reviewId } },
          { new: true }
        ).populate('savedReviews');
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
