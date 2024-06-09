import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SignUp from '../components/SignUp';
import { VStack } from '@chakra-ui/react';

const SignUpPage = ({ onSignUp }) => (
  <React.Fragment>
    
    <Header />
    
    <VStack h='calc(100vh)' bg="orange.100">
      <SignUp onSignUp={onSignUp} />
    </VStack>
    
    <VStack
      borderTop="1px" borderColor="gray.400"
      w="100%" bg="gray.100">
      <Footer />
    </VStack>

  </React.Fragment>
);

export default SignUpPage;
