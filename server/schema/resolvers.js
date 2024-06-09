const { User, Restaurant, Review } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You are not authenticated');
      }
      return User.findById(context.user._id).populate('savedReviews').populate('writtenReviews');
    },
    reviews: async () => {
      return Review.find().populate('userId').populate('restaurantId');
    },
    users: async () => {
      return User.find().populate('savedReviews').populate('writtenReviews');
    },
    restaurants: async () => {
      return Restaurant.find().populate({
        path: 'reviews',
        populate: {
          path: 'userId',
          model: 'User'
        }
      });
    },
    getReview: async (parent, { id }) => {
      return Review.findById(id).populate('userId').populate('restaurantId');
    },
    getUser: async (parent, { id }) => {
      return User.findById(id).populate('savedReviews').populate('writtenReviews');
    },
  },
  Mutation: {
    createRestaurant: async (parent, { name, address, cuisine }) => {
      return Restaurant.create({ name, address, cuisine });
    },
    createReview: async (parent, { comment, rating, userId, restaurantId }) => {
      const newReview = await Review.create({ comment, rating, userId, restaurantId });
      await User.findByIdAndUpdate(userId, { $push: { writtenReviews: newReview._id } });
      await Restaurant.findByIdAndUpdate(restaurantId, { $push: { reviews: newReview._id } });
      return newReview.populate('userId').populate('restaurantId').execPopulate();
    },
    createUser: async (parent, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      return User.create({ username, email, password: hashedPassword });
    },
    loginUser: async (parent, { email, password }) => {
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
    saveReview: async (parent, { review }) => {
      const newReview = await Review.create(review);
      await User.findByIdAndUpdate(review.userId, { $push: { savedReviews: newReview._id } });
      return User.findById(review.userId).populate('savedReviews');
    },
    removeReview: async (parent, { reviewId }) => {
      const review = await Review.findByIdAndDelete(reviewId);
      if (!review) {
        throw new Error('Review not found');
      }
      await User.findByIdAndUpdate(review.userId, { $pull: { savedReviews: reviewId } });
      return User.findById(review.userId).populate('savedReviews');
    },
  },
};

module.exports = resolvers;
