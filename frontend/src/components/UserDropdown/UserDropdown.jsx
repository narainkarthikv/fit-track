import React from 'react';
import { NavDropdown } from 'react-bootstrap';

const UserDropdown = ({ user, handleLogout }) => (
  <NavDropdown title={user} id='user-dropdown'>
    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
  </NavDropdown>
);

export default UserDropdown;
