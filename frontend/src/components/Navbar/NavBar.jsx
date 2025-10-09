import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaDumbbell } from 'react-icons/fa';

import NotificationDropdown from './NotificationDropdown';
import UserDropdown from './UserDropdown';

const NavBar = ({
  user,
  handleLogout,
  notifications,
  toggleNotificationReadStatus,
}) => (
  <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-2">
    <Container
      fluid
      className="d-flex justify-content-between align-items-center px-4"
    >
      <LinkContainer to="dashboard">
        <Navbar.Brand className="d-flex align-items-center">
          <FaDumbbell className="me-2" />
          <span className="fw-semibold">Fit-Track</span>
        </Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="navbar-content" />
      <Navbar.Collapse id="navbar-content" className="justify-content-end">
        <Nav className="gap-3 align-items-center">
          {/* User-related dropdowns */}
          <NotificationDropdown
            notifications={notifications}
            toggleNotificationReadStatus={toggleNotificationReadStatus}
          />
          <UserDropdown user={user} handleLogout={handleLogout} />
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

NavBar.propTypes = {
  user: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.string,
      read: PropTypes.bool,
    })
  ),
  toggleNotificationReadStatus: PropTypes.func,
};

NavBar.defaultProps = {
  notifications: [],
  toggleNotificationReadStatus: () => {},
};

export default NavBar;
