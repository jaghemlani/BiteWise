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
