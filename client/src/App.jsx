import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import RestaurantPage from './pages/RestaurantPage';

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
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login">
          <LoginPage onLogin={handleLogin} />
        </Route>
        <Route path="/signup">
          <SignUpPage onSignUp={handleSignUp} />
        </Route>
        <Route path="/profile">
          <ProfilePage user={user} />
        </Route>
        <Route path="/restaurant/:id" component={RestaurantPage} />
      </Switch>
    </Router>
  );
}

export default App;
