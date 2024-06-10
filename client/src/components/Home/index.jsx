import React from 'react';
import RestaurantList from '../RestaurantList';
import { Box, Text, Center, Image } from '@chakra-ui/react';

const Home = () => (
  <Box>
    <Center fontFamily={'sans-serif'} fontSize={40} >Welcome to BiteWise</Center>
    <Text mt={2} >Our Mission: To ensure great food, generous portions, and reasonable prices.</Text>
    <Box mt={8}>
      <RestaurantList />
      <Image src="/images/ifihadone.jpg" alt="if-i-had-one-image" />
    </Box>
  </Box>
);

export default Home;
