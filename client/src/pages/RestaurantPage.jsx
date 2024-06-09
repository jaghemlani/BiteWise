import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantProfile from '../components/RestaurantProfile';
import { VStack } from '@chakra-ui/react';

const RestaurantPage = ({ restaurant }) => (
  <React.Fragment>

    <Header />

    <VStack h='calc(100vh)' bg="orange.100">
      <RestaurantProfile restaurant={restaurant} />
    </VStack>

    <VStack
      borderTop="1px" borderColor="gray.400"
      w="100%" bg="gray.100">
      <Footer />
    </VStack>
    
  </React.Fragment>
);

export default RestaurantPage;