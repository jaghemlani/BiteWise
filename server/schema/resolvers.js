const { User, Restaurant, Review } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../auth');


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
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('Error creating user:', error); // Log the actual error
        throw new Error('Error creating user');
      }
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

      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, user };
    },
  },
};

module.exports = resolvers;
