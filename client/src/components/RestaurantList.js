import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_RESTAURANTS } from '../graphql/queries';
import { Link } from 'react-router-dom';

const RestaurantList = () => {
  const { loading, error, data } = useQuery(GET_RESTAURANTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Where shall we feast today?</h2>
      <ul>
        {data.restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <Link to={`/restaurant/${restaurant.id}`}>{restaurant.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
