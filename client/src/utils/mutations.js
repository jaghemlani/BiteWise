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
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
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
