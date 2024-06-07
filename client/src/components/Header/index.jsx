import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';

const Header = ({ username }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between">

    <Flex
      flex={{ base: 1, md: 0 }}
      justify={'flex-center'}
      direction={'row'}
      spacing={8}>

      <Text
        textAlign={'center'}
        fontFamily={'heading'}
        color={'black'}>
        BiteWise
      </Text>



    </Flex>

    <Flex
      flex={{ base: 1, md: 0 }}
      justify={'flex-end'}
      direction={'row'}
      spacing={6}>

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
          {/*           <Link to="/login">Login</Link> */}
          <Link as={Link} to="/SignUp">
            Sign Up
          </Link>
          {/*           <Link to="/signup">Sign Up</Link> */}
        </>
      )}
    </Flex>
  </Box>
);

export default Header;