import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../utils//queries';

const Profile = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER, { variables: { id: userId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { username, email } = data.user;

  return (
    <div>
      <h2>{username}'s Profile</h2>
      <p>Email: {email}</p>
      {/* Display other personal info and reviews */}
    </div>
  );
};

export default Profile;