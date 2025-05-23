import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  return <h2>User Detail for User ID: {id}</h2>;
};

export default UserDetail;
