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
      return User.findById(context.user.id).populate('savedReviews').populate('writtenReviews');
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
      try {
        const user = await User.create({ username, email, password });
        console.log('User created:', user); // Debug log
        return user;
      } catch (error) {
        console.error('Error creating user:', error); // Debug log
        throw new Error('Error creating user');
      }
    },
    loginUser: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        console.log('User found:', user); // Debug log

        if (!user) {
          console.error('User not found');
          throw new AuthenticationError('Invalid login credentials');
        }

        console.log('Plaintext password:', password); // Debug log
        console.log('Stored hashed password:', user.password); // Debug log

        const correctPassword = await bcrypt.compare(password, user.password);
        console.log('Password match:', correctPassword); // Debug log

        if (!correctPassword) {
          console.error('Password does not match');
          throw new AuthenticationError('Invalid login credentials');
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token, user };
      } catch (error) {
        console.error('Error logging in user:', error); // Debug log
        throw new AuthenticationError('Invalid login credentials');
      }
    },
    saveReview: async (parent, { review }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You are not authenticated');
      }
      const newReview = await Review.create({ ...review, userId: context.user.id });
      await User.findByIdAndUpdate(context.user.id, { $push: { savedReviews: newReview._id } });
      await Restaurant.findByIdAndUpdate(review.restaurantId, { $push: { reviews: newReview._id } });
      return User.findById(context.user.id).populate('savedReviews');
    },
    removeReview: async (parent, { reviewId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You are not authenticated');
      }
      const review = await Review.findByIdAndDelete(reviewId);
      if (!review) {
        throw new Error('Review not found');
      }
      await User.findByIdAndUpdate(review.userId, { $pull: { savedReviews: reviewId } });
      await Restaurant.findByIdAndUpdate(review.restaurantId, { $pull: { reviews: reviewId } });
      return User.findById(review.userId).populate('savedReviews');
    },
  },
};

module.exports = resolvers;
