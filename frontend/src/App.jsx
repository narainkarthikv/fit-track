import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from './components/Navbar/NavBar';
import Home from './pages/Home';
import DashBoard from './pages/Dashboard';

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
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    if (token && storedUserId) {
      setIsLoggedIn(true);
      setUserID(storedUserId);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserID('');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handleAuthSuccess = (userId) => {
    setIsLoggedIn(true);
    setUserID(userId);
    localStorage.setItem('userId', userId);
    navigate('/dashboard');
  };

  return (
    <div className="App">
      {/* Only render NavBar if user is logged in */}
      {isLoggedIn && (
        <NavBar 
          user={userID} 
          handleLogout={handleLogout}
          userDetails={{ userId: userID }}
        />
      )}

      <Routes>
        {/* Landing Page - Public route */}
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <DashBoard 
                isLoggedIn={false} 
                onAuthSuccess={handleAuthSuccess}
              />
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
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? '/dashboard' : '/'} replace />}
        />
      </Routes>
    </div>
  );
};

const WrappedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WrappedApp;
