import React from 'react';
import { Text, VStack } from '@chakra-ui/react';

const Footer = () => (
  <React.Fragment>
    <VStack
      borderTop="1px" borderColor="gray.400"
      w="100%" bg="gray.100">
      <Text>2024 BiteWise. All rights reserved.</Text>
      <Text>Team GitHub, Date</Text>
    </VStack>
  </React.Fragment>
);

export default Footer;