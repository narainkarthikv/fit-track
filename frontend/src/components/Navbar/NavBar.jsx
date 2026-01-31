import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FitnessCenter as FaDumbbell, Menu as MenuIcon } from '@mui/icons-material';
import NotificationDropdown from './NotificationDropdown';
import UserDropdown from './UserDropdown';

const NavBar = ({
  user,
  handleLogout,
  notifications = [],
  toggleNotificationReadStatus = () => {},
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <List>
        <ListItem>
          <NotificationDropdown
            notifications={notifications}
            toggleNotificationReadStatus={toggleNotificationReadStatus}
          />
        </ListItem>
        <ListItem>
          <UserDropdown user={user} handleLogout={handleLogout} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Logo */}
            <Box
              component={RouterLink}
              to="dashboard"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 700,
                fontSize: '1.25rem',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              <FaDumbbell sx={{ fontSize: '1.5rem', color: 'primary.main' }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                }}
              >
                Fit-Track
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <NotificationDropdown
                  notifications={notifications}
                  toggleNotificationReadStatus={toggleNotificationReadStatus}
                />
                <UserDropdown user={user} handleLogout={handleLogout} />
              </Box>
            )}

            {/* Mobile Navigation */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="toggle navigation"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          PaperProps={{
            sx: {
              backgroundColor: '#1a1a1a',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

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

export default NavBar;
