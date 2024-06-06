import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';

const HomePage = ({ username }) => (
  <div>
    <Header username={username} />
    <Home />
    <Footer />
  </div>
);

export default HomePage;