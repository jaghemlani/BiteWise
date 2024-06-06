const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');
const { authenticate, generateToken } = require('../auth');

// Define UserType
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});

// Define RestaurantType
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

// Define ReviewType
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

// Define RootQuery
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

// Define Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addReview: {
      type: ReviewType,
      args: {
        restaurantId: { type: new GraphQLNonNull(GraphQLID) },
        comment: { type: new GraphQLNonNull(GraphQLString) },
        rating: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args, context) {
        if (!context.user) throw new Error('Unauthorized');
        const review = new Review({
          restaurantId: args.restaurantId,
          comment: args.comment,
          rating: args.rating,
          userId: context.user.id
        });
        return review.save();
      }
    },
    updateReview: {
      type: ReviewType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        comment: { type: GraphQLString },
        rating: { type: GraphQLString }
      },
      async resolve(parent, args, context) {
        if (!context.user) throw new Error('Unauthorized');
        const review = await Review.findById(args.id);
        if (review.userId.toString() !== context.user.id) {
          throw new Error('Unauthorized');
        }
        if (args.comment !== undefined) review.comment = args.comment;
        if (args.rating !== undefined) review.rating = args.rating;
        return review.save();
      }
    },
    deleteReview: {
      type: ReviewType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, args, context) {
        if (!context.user) throw new Error('Unauthorized');
        const review = await Review.findById(args.id);
        if (review.userId.toString() !== context.user.id) {
          throw new Error('Unauthorized');
        }
        return Review.findByIdAndRemove(args.id);
      }
    },
    loginUser: {
      type: new GraphQLObjectType({
        name: 'LoginResponse',
        fields: {
          token: { type: GraphQLString },
          user: { type: UserType }
        }
      }),
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
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
          token: generateToken(user),
          user
        };
      }
    },
    signUpUser: {
      type: new GraphQLObjectType({
        name: 'SignUpResponse',
        fields: {
          token: { type: GraphQLString },
          user: { type: UserType }
        }
      }),
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
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
          token: generateToken(newUser),
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
