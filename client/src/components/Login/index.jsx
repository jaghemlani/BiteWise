import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils//mutations';
import { Form, FormLabel, Button, Input, Center } from '@chakra-ui/react'; 

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
    <Form onSubmit={handleSubmit}>
      <Center alignItem="center">Login</Center>
      <FormLabel>
        Username:
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </FormLabel>
      <FormLabel>
        Password:
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormLabel>
      <Button type="submit">Login</Button>
    </Form>
  );
};

export default Login;
