import React from 'react';
import { Navbar, Nav, NavDropdown, Badge, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaDumbbell } from 'react-icons/fa';
const NavBar = ({ user, handleLogout, notifications }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid className="d-flex justify-content-between align-items-center px-4">
        <LinkContainer to={`/${user}`}>
          <Navbar.Brand>
            <FaDumbbell className="mb-1" /> Fit-Track
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content" className="justify-content-end">
          <Nav>
            <NotificationDropdown notifications={notifications} />
            <UserDropdown user={user} handleLogout={handleLogout} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const NotificationDropdown = ({ notifications = [] }) => {
  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);
  const unreadCount = unreadNotifications.length;

  return (
    <NavDropdown
      title={
        <span>
          <i className="bi bi-bell-fill"></i>
          {unreadCount > 0 && <Badge pill bg="danger" className="ms-1">{unreadCount}</Badge>}
        </span>
      }
      id="notificationDropdown"
      align="end"
    >
      {notifications.length > 0 ? (
        <>
          <NavDropdown.Header>Unread Notifications</NavDropdown.Header>
          {unreadNotifications.length > 0 ? (
            unreadNotifications.map((notification, index) => (
              <NavDropdown.Item key={`unread-${index}`} className="fw-bold">
                {notification.message}
              </NavDropdown.Item>
            ))
          ) : (
            <NavDropdown.Item className="text-muted">No unread notifications</NavDropdown.Item>
          )}

          <NavDropdown.Divider />

          <NavDropdown.Header>Read Notifications</NavDropdown.Header>
          {readNotifications.length > 0 ? (
            readNotifications.map((notification, index) => (
              <NavDropdown.Item key={`read-${index}`}>
                {notification.message}
              </NavDropdown.Item>
            ))
          ) : (
            <NavDropdown.Item className="text-muted">No read notifications</NavDropdown.Item>
          )}
        </>
      ) : (
        <NavDropdown.Item className="text-muted">No new notifications</NavDropdown.Item>
      )}
    </NavDropdown>
  );
};

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

export default NavBar;
