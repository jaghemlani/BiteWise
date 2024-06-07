import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { Form, Button, ListGroup } from 'react-bootstrap';

const GOOGLE_PLACES_QUERY = gql`
  query GooglePlaces($restaurantName: String!, $location: String!) {
    googlePlaces(restaurantName: $restaurantName, location: $location) {
      place_id
      name
      rating
      user_ratings_total
      formatted_address
    }
  }
`;

const GooglePlaces = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [location, setLocation] = useState('');
  const [searchPlaces, { loading, data }] = useLazyQuery(GOOGLE_PLACES_QUERY);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPlaces({ variables: { restaurantName, location } });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Search</Button>
      </Form>
      {loading && <p>Loading...</p>}
      {data && (
        <ListGroup>
          {data.googlePlaces.map((place) => (
            <ListGroup.Item key={place.place_id}>
              <h5>{place.name}</h5>
              <p>Rating: {place.rating}</p>
              <p>User Ratings: {place.user_ratings_total}</p>
              <p>Address: {place.formatted_address}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default GooglePlaces;
