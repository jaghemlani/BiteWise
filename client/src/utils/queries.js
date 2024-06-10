import { gql } from '@apollo/client';

export const GET_RESTAURANTS = gql`
  query getRestaurants {
    restaurants {
      id
      name
      avgReview
    }
  }
`;

export const GET_RESTAURANT = gql`
  query getRestaurant($id: ID!) {
    restaurant(id: $id) {
      id
      name
      avgReview
      reviews {
        id
        comment
        rating
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
    }
  }
`;
