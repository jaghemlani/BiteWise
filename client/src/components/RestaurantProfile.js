import React from 'react';

const RestaurantProfile = ({ restaurant }) => (
  <div>
    <h2>{restaurant.name}</h2>
    <div>Average Review: {restaurant.avgReview} stars</div>
    <div>Photos: {/* Display photos */}</div>
    <button>Leave a Review</button>
    <div>Recent Reviews: {/* Display recent reviews */}</div>
  </div>
);

export default RestaurantProfile;
