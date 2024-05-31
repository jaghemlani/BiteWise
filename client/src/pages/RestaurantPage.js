import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantProfile from '../components/RestaurantProfile';

const RestaurantPage = ({ restaurant }) => (
  <div>
    <Header />
    <RestaurantProfile restaurant={restaurant} />
    <Footer />
  </div>
);

export default RestaurantPage;
