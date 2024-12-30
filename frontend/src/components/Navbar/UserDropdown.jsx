import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const UserDropdown = ({ user, handleLogout }) => (
  <NavDropdown title={<i className="bi bi-person-circle"></i>} id="userDropdown" align="end">
    <LinkContainer to={`/${user}/edit`}>
      <NavDropdown.Item className="text-primary">
        <i className="bi bi-pencil-square me-2"></i> Edit Profile
      </NavDropdown.Item>
    </LinkContainer>
    <NavDropdown.Divider />
    <NavDropdown.Item className="text-danger" onClick={handleLogout}>
      <i className="bi bi-box-arrow-right me-2"></i> Logout
    </NavDropdown.Item>
  </NavDropdown>
);

export default UserDropdown;
