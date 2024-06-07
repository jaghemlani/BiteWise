import React from 'react';
import { Link } from 'react-router-dom';
import { Box, VStack, Center, HStack, Spacer, Grid } from '@chakra-ui/react';

const Header = ({ username }) => (

  <React.Fragment>
    <VStack
      borderBottom={'1px'} borderColor="gray.300"
      w="100%" h="100px" bg="gray.200">
      
      <Box w="400px" h="100%" bg="pink" rounded="md">
          <Center h="100%">
            BiteWise
          </Center>
        </Box>
      <HStack w="100%" h="100%" p="1">
        
        
        <Spacer />
        
        <Grid templateColumns='repeat(3, 1fr)'gap={1} >

          <Box w="70%" h="100%" bg="pink" rounded="md">
            <Center h="100%">
              <Link as={Link} to="/" >
                Home
              </Link>
            </Center>
          </Box>

          <Grid templateColumns='repeat(2, 1fr)'gap={1} >
            {username ? (
              <Link to="/profile">
                {username}
              </Link>
            ) : (
              <>
                <Box w="100%" h="100%" bg="pink" rounded="md">
                  <Center h="100%">
                    <Link as={Link} to="/login" >
                      Log in
                    </Link>
                  </Center>
                </Box>

                <Box w="100%" h="100%" bg="pink" rounded="md">

                  <Center h="100%">
                    <Link as={Link} to="/SignUp">
                      Sign Up
                    </Link>
                  </Center>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </HStack>
    </VStack>
  </React.Fragment>
);

export default Header;
