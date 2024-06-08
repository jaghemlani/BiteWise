const typeDefs = `
  type Restaurant {
    _id: ID!
    name: String!
    address: String!
    cuisine: String!
    avgReview: Float
    reviews: [Review]
  }

  type Review {
    _id: ID!
    comment: String!
    rating: Int!
    userId: User!
    restaurantId: Restaurant!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedReviews: [Review]!
    writtenReviews: [Review]!
  }

  type Auth {
    token: String!
    user: User!
  }

  input ReviewInput {
    comment: String!
    rating: Int!
    restaurantId: ID!
  }

  type Query {
    me: User
    reviews: [Review]
    users: [User]
    restaurants: [Restaurant]
    getReview(id: ID!): Review
    getUser(id: ID!): User
  }

  type Mutation {
    createRestaurant(name: String!, address: String!, cuisine: String!): Restaurant
    createReview(comment: String!, rating: Int!, userId: ID!, restaurantId: ID!): Review
    createUser(username: String!, email: String!, password: String!): User
    loginUser(email: String!, password: String!): Auth
    saveReview(review: ReviewInput!): User
    removeReview(reviewId: ID!): User
  }
`;

module.exports = typeDefs;
