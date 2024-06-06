import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "semantic-ui-css/semantic.min.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import RestaurantPage from './pages/RestaurantPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import NoMatch from './pages/NoMatch';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true, 
        element: <HomePage />
      }, {
        path: '/LoginPage',
        element: <LoginPage />
      }, {
        path: '/ProfilePage',
        element: <ProfilePage />
      }, {
        path: '/RestaurantPage',
        element: <RestaurantPage />
      }, {
        path: '/SignUpPage',
        element: <SignUpPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)