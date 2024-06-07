import React from 'react';
import { Link } from 'react-router-dom';
import { Box, VStack, Center, HStack, Spacer } from '@chakra-ui/react';

const Header = ({ username }) => (
  <React.Fragment>
    <VStack
      borderBottom={'1px'} borderColor="gray.300"
      w="100%" h="100px" bg="gray.200">
      <HStack w="100%" h="100%" p="1">
        <Box w="400px" h="100%" bg="pink" rounded="md">
          <Center h="100%">
            BiteWise
          </Center>
        </Box>
        <Spacer />
        <Box w="150px" h="100%" align="end" pr="5">
          <Link as={Link} to="/" >
            Home
          </Link>
          {username ? (
            <Link to="/profile">{username}</Link>
          ) : (
            <>
              <Link as={Link} to="/login" >
                Log in
              </Link>
              <Link as={Link} to="/SignUp">
                Sign Up
              </Link>
            </>
          )}
        </Box>
      </HStack>
    </VStack>
  </React.Fragment>
);

export default Header;
