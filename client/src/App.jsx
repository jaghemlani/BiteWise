import React, { useState, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'; // Make sure this import is correct
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import RestaurantPage from './pages/RestaurantPage';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    // Dummy user data
    setUser({ username, email: `${username}@example.com` });
  };

  const handleSignUp = (username) => {
    // Dummy user data
    setUser({ username, email: `${username}@example.com` });
  };

  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUpPage onSignUp={handleSignUp} />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;