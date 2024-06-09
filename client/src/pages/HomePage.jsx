import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import { VStack } from '@chakra-ui/react';

const HomePage = ({ username }) => (
  <React.Fragment>
    
    <Header username={username} />

    <VStack h='calc(100vh)' bg="orange.100">
      <Home />
    </VStack>

    <VStack
      borderTop="1px" borderColor="gray.400"
      w="100%" bg="gray.100">
      <Footer />
    </VStack>

  </React.Fragment>
);

export default HomePage;
