import React, { useState } from 'react';
import { Dropdown, Badge, Button, ButtonGroup } from 'react-bootstrap';
import { FaBell, FaEnvelope, FaEnvelopeOpen, FaTrashAlt } from 'react-icons/fa';

const NotificationDropdown = () => {
  const initialNotifications = [
    { id: 1, message: 'Welcome to Fit Track!', read: false },
    {
      id: 2,
      message: 'Your profile is 80% complete. Complete it for full',
      read: false,
    },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);

  const toggleNotificationReadStatus = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Dropdown as={ButtonGroup} align="start">
      <Button variant="primary" onClick={markAllAsRead}>
        Read All
      </Button>

      <Dropdown.Toggle
        variant="primary"
        id="dropdown-split-basic"
        className="position-relative"
      >
        <FaBell />
        {unreadCount > 0 && (
          <Badge
            bg="danger"
            className="position-absolute top-0 start-50 badge rounded-pill"
          >
            {unreadCount}
          </Badge>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu align="end" className="p-2">
        {notifications.map((notification) => (
          <Dropdown.Item
            key={notification.id}
            className="d-flex justify-content-between align-items-center text-wrap"
          >
            <span
              className="flex-wrap"
              onClick={() => toggleNotificationReadStatus(notification.id)}
            >
              {notification.message}
            </span>
            <div>
              {notification.read ? (
                <FaEnvelopeOpen className="me-2" />
              ) : (
                <FaEnvelope className="me-2" />
              )}
              <FaTrashAlt onClick={() => deleteNotification(notification.id)} />
            </div>
          </Dropdown.Item>
        ))}
        {notifications.length === 0 && (
          <Dropdown.Item className="text-center">
            No notifications
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationDropdown;
