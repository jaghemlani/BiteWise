import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SignUp from '../components/SignUp';

const SignUpPage = ({ onSignUp }) => (
  <div>
    <Header />
    <SignUp onSignUp={onSignUp} />
    <Footer />
  </div>
);

export default SignUpPage;
