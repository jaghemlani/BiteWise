import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils//mutations';
import { Box, Text, Button, Input, Center } from '@chakra-ui/react'; 

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { username, password } });
      onLogin(data.loginUser.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box onSubmit={handleSubmit}>
      <Center alignItem="center">Login</Center>
      <Text>
        Username:
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Text>
      <Text>
        Password:
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Text>
      <Button type="submit">Login</Button>
    </Box>
  );
};

export default Login;
