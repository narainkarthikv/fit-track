import React from 'react';
import { NavDropdown, Badge } from 'react-bootstrap';

const NotificationDropdown = ({ notifications }) => (
  <NavDropdown title={<span>Notifications <Badge bg="secondary">{notifications.length}</Badge></span>} id="notification-dropdown">
    {notifications.map((notification, index) => (
      <NavDropdown.Item key={index}>{notification}</NavDropdown.Item>
    ))}
  </NavDropdown>
);

export default NotificationDropdown;
