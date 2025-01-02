import React, { useState } from 'react';
import { Dropdown, Badge } from 'react-bootstrap';
import { FaBell, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';

const NotificationDropdown = () => {
  const initialNotifications = [
    { id: 1, message: 'Welcome to Fit Track!', read: false },
    { id: 2, message: 'Your profile is 80% complete. Complete it for full', read: false }
  ];
  
  const [notifications, setNotifications] = useState(initialNotifications);

  const toggleNotificationReadStatus = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: !n.read } : n
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Dropdown align='start'>
      <Dropdown.Toggle variant='dark' id='dropdown-basic' className='position-relative'>
        <FaBell />
        {unreadCount > 0 && <Badge bg='danger' className='position-absolute top-0 start-50 badge rounded-pill'>{unreadCount}</Badge>}
      </Dropdown.Toggle>

      <Dropdown.Menu align='end'>
        {notifications.map(notification => (
          <Dropdown.Item 
            key={notification.id} 
            onClick={() => toggleNotificationReadStatus(notification.id)}
            className='d-flex justify-content-between align-items-center text-wrap'
          >
            <span className='flex-wrap'>{notification.message}</span>
            {notification.read ? <FaEnvelopeOpen /> : <FaEnvelope />}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationDropdown;
