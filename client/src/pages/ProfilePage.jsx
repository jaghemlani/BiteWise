import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../components/Profile';
import { VStack } from '@chakra-ui/react';

const ProfilePage = ({ user }) => (
  <React.Fragment>

    <Header username={user.username} />

    <VStack h='calc(100vh)' bg="orange.100">
      <Profile user={user} />
    </VStack>

    <VStack
      borderTop="1px" borderColor="gray.400"
      w="100%" bg="gray.100">
      <Footer />
    </VStack>
    
  </React.Fragment>
);

export default ProfilePage;