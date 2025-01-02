import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const UserDropdown = ({ user, handleLogout }) => (
  <Dropdown align='end'>
    <Dropdown.Toggle variant='dark' id='dropdown-basic'>
      <i className='bi bi-person-circle'></i>
    </Dropdown.Toggle>

    <Dropdown.Menu align='end'>
      <LinkContainer to={`/${user}/edit`}>
        <Dropdown.Item>
          <i className='bi bi-pencil-square me-2'></i> Edit Profile
        </Dropdown.Item>
      </LinkContainer>
      <Dropdown.Divider />
      <Dropdown.Item onClick={handleLogout}>
        <i className='bi bi-box-arrow-right me-2'></i> Logout
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default UserDropdown;
