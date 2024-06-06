// const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList } = require('graphql');
// const mongoose = require('mongoose');

// const User = require('../models/User');
// const Restaurant = require('../models/Restaurant');
// const Review = require('../models/Review');

// const UserType = new GraphQLObjectType({
//   name: 'User',
//   fields: () => ({
//     id: { type: GraphQLID },
//     username: { type: GraphQLString },
//     email: { type: GraphQLString }
//   })
// });

// const RestaurantType = new GraphQLObjectType({
//   name: 'Restaurant',
//   fields: () => ({
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     avgReview: { type: GraphQLString }
//   })
// });

// const ReviewType = new GraphQLObjectType({
//   name: 'Review',
//   fields: () => ({
//     id: { type: GraphQLID },
//     comment: { type: GraphQLString },
//     user: { type: UserType },
//     restaurant: { type: RestaurantType }
//   })
// });

// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     user: {
//       type: UserType,
//       args: { id: { type: GraphQLID } },
//       resolve(parent, args) {
//         return User.findById(args.id);
//       }
//     },
//     restaurant: {
//       type: RestaurantType,
//       args: { id: { type: GraphQLID } },
//       resolve(parent, args) {
//         return Restaurant.findById(args.id);
//       }
//     },
//     review: {
//       type: ReviewType,
//       args: { id: { type: GraphQLID } },
//       resolve(parent, args) {
//         return Review.findById(args.id);
//       }
//     }
//   }
// });

// module.exports = new GraphQLSchema({
//   query: RootQuery
// });
