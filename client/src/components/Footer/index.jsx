import React from 'react';
import { Box, Center, Link, Flex, Text } from "@chakra-ui/react";

const Footer = () => (
  <Center>
    <Box p="5" borderWidth="1px">
      <Flex align="baseline" mt={2}>
        <Text ml={2} textTransform="uppercase" fontSize="sm" fontWeight="bold" color="pink.800">
          &copy; 2024 BiteWise. All rights reserved.
        </Text>
        <Text ml={2} textTransform="uppercase" fontSize="sm" fontWeight="bold" color="pink.800">
          Team: 
          <Link href="https://github.com/A-Raschke" isExternal>
            Adam Raschke, 
          </Link>
          <Link href="https://github.com/ryans-hub" isExternal>
            Ryan Pan, 
          </Link>
          <Link href="https://github.com/jaghemlani" isExternal>
            Jag Hemlani
          </Link>
        </Text>
      </Flex>
    </Box>
  </Center>
);

export default Footer;
