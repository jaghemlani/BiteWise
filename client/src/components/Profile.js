import React from 'react';

const Profile = ({ user }) => (
  <div>
    <h2>{user.username}'s Profile</h2>
    <p>Email: {user.email}</p>
    {/* Display other personal info and reviews */}
  </div>
);

export default Profile;
