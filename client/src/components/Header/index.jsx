import React from 'react';
import { Link } from 'react-router-dom';
import { Box, VStack, Center, HStack, Spacer, Grid, Button } from '@chakra-ui/react';

const Header = ({ username }) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
  <VStack borderBottom="1px" borderColor="red.300" w="100%" h="100px" bg="yellow.100">
    <Box w="400px" h="100%" bg="pink" rounded="md">
      <Center h="100%">BiteWise</Center>
    </Box>
    <HStack w="100%" h="100%" p="1">
      <Spacer />
      <Grid templateColumns="repeat(3, 1fr)" gap={1}>
        <Box w="70%" h="100%">
          <Button bg="pink" h="100%">
            <Link to="/">Home</Link>
          </Button >
        </Box>
        {username ? (
          <>
            <Link to="/profile">{username}</Link>
            <Button onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <LoginLink />
            <SignUpLink />
          </>
        )}
      </Grid>
    </HStack>
  </VStack>
  );
};

const LoginLink = () => (
  <Box w="100%" h="100%">
    <Button bg="pink" h="100%">
      <Link as={Link} to="/LoginPage">
        Log in
      </Link>
    </Button >
  </Box>
);

const SignUpLink = () => (
  <Box w="100%" h="100%">
    <Button bg="pink" h="100%">
      <Link as={Link} to="/SignUpPage">
        Sign Up
      </Link>
    </Button >
  </Box>
);

export default Header;