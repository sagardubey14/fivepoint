import React from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
  return (
    <div>
      <h2>Users Page</h2>
      <ul>
        <li><Link to="/admin/users/1">View User 1</Link></li>
        <li><Link to="/admin/users/2">View User 2</Link></li>
      </ul>
    </div>
  );
};

export default Users;
