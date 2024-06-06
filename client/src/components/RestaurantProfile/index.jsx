import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_RESTAURANT } from '../../utils/queries';
import { useParams } from 'react-router-dom';
import AddReview from '../AddReview';

const RestaurantProfile = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_RESTAURANT, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const restaurant = data.restaurant;

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <div>Average Review: {restaurant.avgReview} stars</div>
      <div>Photos: {/* Display photos */}</div>
      <AddReview restaurantId={restaurant.id} />
      <div>Recent Reviews: 
        {restaurant.reviews.map(review => (
          <div key={review.id}>
            <p>{review.comment}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantProfile;