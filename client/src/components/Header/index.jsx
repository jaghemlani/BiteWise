import React from 'react';
import { Link } from 'react-router-dom';
import { Box, VStack, Center, HStack, Spacer, Grid } from '@chakra-ui/react';

const Header = ({ username }) => (
  <VStack borderBottom="1px" borderColor="gray.300" w="100%" h="100px" bg="gray.200">
    <Box w="400px" h="100%" bg="pink" rounded="md">
      <Center h="100%">BiteWise</Center>
    </Box>
    <HStack w="100%" h="100%" p="1">
      <Spacer />
      <Grid templateColumns="repeat(3, 1fr)" gap={1}>
        <Box w="70%" h="100%" bg="pink" rounded="md">
          <Center h="100%">
            <Link to="/">Home</Link>
          </Center>
        </Box>
        {username ? (
          <>
            <Link to="/profile">{username}</Link>
            <LogoutLink />
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

const LoginLink = () => (
  <Box w="100%" h="100%" bg="pink" rounded="md">
    <Center h="100%">
      <Link as={Link} to="/login">
        Log in
      </Link>
    </Center>
  </Box>
);

const SignUpLink = () => (
  <Box w="100%" h="100%" bg="pink" rounded="md">
    <Center h="100%">
      <Link as={Link} to="/SignUp">
        Sign Up
      </Link>
    </Center>
  </Box>
);

const LogoutLink = () => (
  <Box w="100%" h="100%" bg="pink" rounded="md">
    <Center h="100%">
      <Link as={Link} to="/logout">
        Log out
      </Link>
    </Center>
  </Box>
);

export default Header;