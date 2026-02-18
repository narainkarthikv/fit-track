import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import NavBar from './components/Navbar/NavBar';
import Home from './pages/Home';
import DashBoard from './pages/Dashboard';
import {
  USER_ID_KEY,
  clearAuthStorage,
  getAccessToken,
} from './utils/api';

// Private Route wrapper component
const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState('');
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const token = getAccessToken();
    const storedUserId = localStorage.getItem(USER_ID_KEY);
    if (token && storedUserId) {
      setIsLoggedIn(true);
      setUserID(storedUserId);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUserID('');
    clearAuthStorage();
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const logoutListener = () => {
      handleLogout();
    };

    window.addEventListener('auth:logout', logoutListener);
    return () => {
      window.removeEventListener('auth:logout', logoutListener);
    };
  }, [handleLogout]);

  const handleAuthSuccess = (userId) => {
    setIsLoggedIn(true);
    setUserID(userId);
    localStorage.setItem(USER_ID_KEY, userId);
    navigate('/dashboard');
  };

  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      {/* Only render NavBar if user is logged in */}
      {isLoggedIn && (
        <NavBar user={userID} handleLogout={handleLogout} userDetails={{ userId: userID }} />
      )}

      <Routes>
        {/* Landing Page - Public route */}
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <DashBoard isLoggedIn={false} onAuthSuccess={handleAuthSuccess} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Dashboard - Private route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Home user={userID} />
            </PrivateRoute>
          }
        />

        {/* Redirect all undefined routes */}
        <Route path="*" element={<Navigate to={isLoggedIn ? '/dashboard' : '/'} replace />} />
      </Routes>
    </Box>
  );
};

const WrappedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WrappedApp;
