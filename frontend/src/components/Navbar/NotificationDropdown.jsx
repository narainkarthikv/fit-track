import React from 'react';
import { NavDropdown, Badge } from 'react-bootstrap';

const NotificationDropdown = ({ notifications = [] }) => {
  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);
  const unreadCount = unreadNotifications.length;

  return (
    <NavDropdown
      title={
        <span className="position-relative px-1">
          <i className="bi bi-bell-fill"></i>
          {unreadCount > 0 && (
            <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
              {unreadCount}
            </Badge>
          )}
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

export default NotificationDropdown;
