import React from 'react';
import RestaurantList from '../RestaurantList';
import { Text, VStack } from '@chakra-ui/react';

const Home = () => (
  <React.Fragment>
    <VStack h='calc(100vh - 200px)'>
      <Text>Welcome to BiteWise</Text>
      <Text>Our Mission: To ensure great food, generous portions, and reasonable prices.</Text>
      <RestaurantList />
    </VStack>
  </React.Fragment>
);

export default Home;