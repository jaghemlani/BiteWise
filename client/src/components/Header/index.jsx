import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'

const Header = ({ username }) => (
  <Menu fixed="top" size="huge">
    <header>
      <div className="logo">
        <h1 className="ui center aligned header">
          BiteWise
        </h1>
      </div>
      <nav>
        <Container>
          <Menu.Item>
            <Button as={Link} to="/" style={{ fontSize: "1.5rem" }}>
              Home
            </Button>
            {username ? (
              <Link to="/profile">{username}</Link>
            ) : (
              <>
                <Button as={Link} to="/login" style={{ fontSize: "1.5rem" }}>
                  Log in
                </Button>
                {/*           <Link to="/login">Login</Link> */}
                <Button as={Link} to="/SignUp" style={{ fontSize: "1.5rem" }}>
                  Sign Up
                </Button>
                {/*           <Link to="/signup">Sign Up</Link> */}
              </>
            )}
          </Menu.Item>
        </Container>
      </nav>
    </header>
  </Menu>
);

export default Header;