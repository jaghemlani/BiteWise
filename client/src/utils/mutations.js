import { gql } from '@apollo/client';

export const ADD_REVIEW = gql`
  mutation addReview($restaurantId: ID!, $comment: String!, $rating: Int!) {
    addReview(restaurantId: $restaurantId, comment: $comment, rating: $rating) {
      id
      comment
      rating
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation signUpUser($username: String!, $email: String!, $password: String!) {
    signUpUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;
