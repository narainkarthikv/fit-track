import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Box,
  Typography,
  ListItemIcon,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Notifications as FaBell,
  MailOutline as FaEnvelope,
  Mail as FaEnvelopeOpen,
  Delete as FaTrashAlt,
  DoneAll as CheckAllIcon,
} from '@mui/icons-material';
import PropTypes from 'prop-types';

const NotificationDropdown = ({ notifications = [], toggleNotificationReadStatus }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifs, setNotifs] = useState([
    { id: 1, message: 'Welcome to Fit Track!', read: false },
    {
      id: 2,
      message: 'Your profile is 80% complete. Complete it for full',
      read: false,
    },
  ]);

  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleNotificationRead = (id) => {
    setNotifs(notifs.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
    if (toggleNotificationReadStatus) {
      toggleNotificationReadStatus(id);
    }
  };

  const markAllAsRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
    handleClose();
  };

  const deleteNotification = (id) => {
    setNotifs(notifs.filter((n) => n.id !== id));
  };

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'notification-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Badge badgeContent={unreadCount} color="error">
          <FaBell sx={{ fontSize: '1.5rem' }} />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="notification-menu"
        open={open}
        onClose={handleClose}
        MenuListProps={{ disablePadding: true }}
        PaperProps={{
          sx: {
            backgroundColor: '#1a1a1a',
            width: { xs: '92vw', sm: 360, md: 420 },
            maxWidth: { xs: '92vw', sm: 420 },
            maxHeight: { xs: 320, sm: 420 },
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden',
            borderRadius: 2.5,
          },
        }}
      >
        <Box
          sx={{
            p: isMobile ? 1.5 : 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            backgroundColor: '#1a1a1a',
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <IconButton size="small" onClick={markAllAsRead}>
              <CheckAllIcon fontSize="small" sx={{ color: 'primary.main' }} />
            </IconButton>
          )}
        </Box>
        <Divider />
        <Box
          sx={{
            maxHeight: { xs: 250, sm: 320 },
            overflowY: 'auto',
          }}
        >
          {notifs.length === 0 ? (
            <MenuItem disabled>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                No notifications
              </Typography>
            </MenuItem>
          ) : (
            notifs.map((notification) => (
              <MenuItem
                key={notification.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                  py: 1.5,
                  px: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    flex: 1,
                    cursor: 'pointer',
                    fontWeight: notification.read ? 400 : 600,
                    color: notification.read ? 'text.secondary' : 'text.primary',
                  }}
                  onClick={() => toggleNotificationRead(notification.id)}
                >
                  {notification.message}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {notification.read ? (
                    <FaEnvelopeOpen fontSize="small" />
                  ) : (
                    <FaEnvelope fontSize="small" />
                  )}
                  <IconButton
                    size="small"
                    onClick={() => deleteNotification(notification.id)}
                    sx={{
                      p: 0,
                      color: '#FF6B6B',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 107, 107, 0.1)',
                      },
                    }}
                  >
                    <FaTrashAlt fontSize="small" />
                  </IconButton>
                </Box>
              </MenuItem>
            ))
          )}
        </Box>
      </Menu>
    </>
  );
};

NotificationDropdown.propTypes = {
  notifications: PropTypes.array,
  toggleNotificationReadStatus: PropTypes.func,
};

export default NotificationDropdown;
