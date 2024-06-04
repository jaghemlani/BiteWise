const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList } = require('graphql');
const mongoose = require('mongoose');

const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    avgReview: { type: GraphQLString },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return Review.find({ restaurantId: parent.id });
      }
    }
  })
});

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    rating: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    },
    restaurant: {
      type: RestaurantType,
      resolve(parent, args) {
        return Restaurant.findById(parent.restaurantId);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    restaurant: {
      type: RestaurantType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Restaurant.findById(args.id);
      }
    },
    review: {
      type: ReviewType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Review.findById(args.id);
      }
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        return Restaurant.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addReview: {
      type: ReviewType,
      args: {
        restaurantId: { type: GraphQLID },
        comment: { type: GraphQLString },
        rating: { type: GraphQLString }
      },
      resolve(parent, args, context) {
        const review = new Review({
          restaurantId: args.restaurantId,
          comment: args.comment,
          rating: args.rating,
          userId: context.user.id
        });
        return review.save();
      }
    },
    loginUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const user = await User.findOne({ username: args.username });
        if (!user) {
          throw new Error('User not found');
        }
        const isValid = await bcrypt.compare(args.password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }
        return {
          token: jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET),
          user
        };
      }
    },
    signUpUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const hashedPassword = await bcrypt.hash(args.password, 12);
        const user = new User({
          username: args.username,
          email: args.email,
          password: hashedPassword
        });
        const newUser = await user.save();
        return {
          token: jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_SECRET),
          user: newUser
        };
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
