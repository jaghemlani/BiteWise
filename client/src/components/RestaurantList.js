import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantList = ({ restaurants }) => (
  <div>
    <h2>Where shall we feast today?</h2>
    <ul>
      {restaurants.map((restaurant) => (
        <li key={restaurant.id}>
          <Link to={`/restaurant/${restaurant.id}`}>{restaurant.name}</Link>
        </li>
      ))}
    </ul>
    <p>More Choices Soon!</p>
  </div>
);

export default RestaurantList;

