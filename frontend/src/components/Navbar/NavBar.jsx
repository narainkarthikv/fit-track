import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaDumbbell } from 'react-icons/fa';
import NotificationDropdown from './NotificationDropdown';
import UserDropdown from './UserDropdown';

const NavBar = ({ user, handleLogout, notifications, toggleNotificationReadStatus }) => (
  <Navbar bg='dark' variant='dark' expand='lg'>
    <Container fluid className='d-flex justify-content-between align-items-center px-4'>
      <LinkContainer to={`/${user}`}>
        <Navbar.Brand>
          <FaDumbbell className='mb-1' /> Fit-Track
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='navbar-content' />
      <Navbar.Collapse id='navbar-content' className='justify-content-end'>
        <Nav>
          <NotificationDropdown notifications={notifications} toggleNotificationReadStatus={toggleNotificationReadStatus} />
          <UserDropdown user={user} handleLogout={handleLogout} />
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBar;
