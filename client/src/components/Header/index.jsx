import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ username }) => (
  <header>
    <div className="logo">BiteWise</div>
    <nav>
      <Link to="/">Home</Link>
      {username ? (
        <Link to="/profile">{username}</Link>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  </header>
);

export default Header;