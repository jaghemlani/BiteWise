import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../components/Login';

const LoginPage = ({ onLogin }) => (
  <div>
    <Header />
    <Login onLogin={onLogin} />
    <Footer />
  </div>
);

export default LoginPage;
