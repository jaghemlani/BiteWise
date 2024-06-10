import React from 'react';
import RestaurantList from '../RestaurantList';
import { Box, Text, Center } from '@chakra-ui/react'; 

const Home = () => (
  <Box>
    <Center fontFamily={'sans-serif'} fontSize={40} >Welcome to BiteWise</Center>
    <Text mt={2} >Our Mission: To ensure great food, generous portions, and reasonable prices.</Text>
    <Box mt={8}>
      <RestaurantList />
    </Box>
  </Box>
);

export default Home;
