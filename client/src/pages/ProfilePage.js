import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../components/Profile';

const ProfilePage = ({ user }) => (
  <div>
    <Header username={user.username} />
    <Profile user={user} />
    <Footer />
  </div>
);

export default ProfilePage;
