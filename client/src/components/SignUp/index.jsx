import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../../utils/mutations';
import { Box, Text, Button, Input, Center } from '@chakra-ui/react'; 

const SignUp = ({ onSignUp }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpUser, { error }] = useMutation(SIGNUP_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signUpUser({ variables: { username, email, password } });
      onSignUp(data.createUser.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box onSubmit={handleSubmit}>
      <Center>Sign Up</Center>
      <Text>
        Username:
        <Input bg="white" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Text>
      <Text>
        Email:
        <Input bg="white" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Text>
      <Text>
        Password:
        <Input bg="white" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Text>
      <Button mt={2} type="submit">Sign Up</Button>
      {error && <p>Error signing up. Please try again.</p>}
    </Box>
  );
};

export default SignUp;
