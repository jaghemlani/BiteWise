const typeDefs = `
  type Restaurant {
    _id: ID!
    name: String!
    avgReview: String
  }

  type Review {
    _id: ID!
    comment: String!
    rating: String!
    userId: ID!
    restaurantId: ID!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    savedReviews: [ID]!
  }

  type Auth {
    token: String!
    user: User!
  }

  input ReviewInput {
    comment: String!
    rating: String!
    restaurantId: ID!
  }

  type Query {
    me: User
    getRestaurant(id: ID!): Restaurant
    getReview(id: ID!): Review # Define getReview query
    getUser(id: ID!): User
  }

  type Mutation {
    createRestaurant(name: String!, avgReview: String): Restaurant
    createReview(comment: String!, rating: String!, userId: ID!, restaurantId: ID!): Review
    createUser(username: String!, email: String!, password: String!, savedReviews: [ID]!): User
    loginUser(email: String!, password: String!): Auth
    saveReview(review: ReviewInput!): User
    removeReview(reviewId: ID!): User
  }
`;

module.exports = typeDefs;
