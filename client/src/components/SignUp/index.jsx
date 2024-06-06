import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../../utils/mutations';

const SignUp = ({ onSignUp }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpUser] = useMutation(SIGNUP_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signUpUser({ variables: { username, email, password } });
      onSignUp(data.signUpUser.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
