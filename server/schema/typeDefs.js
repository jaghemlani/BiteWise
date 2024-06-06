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
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveReview(review: ReviewInput!): User
    removeReview(reviewId: ID!): User
  }
`;

module.exports = typeDefs;
