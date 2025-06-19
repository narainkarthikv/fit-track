import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from './components/Navbar/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import DashBoard from './pages/Dashboard';

// Private Route wrapper component
const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="login" />;
};

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

// Public Route wrapper component
const PublicRoute = ({ isLoggedIn, children }) => {
  return !isLoggedIn ? children : <Navigate to="dashboard" />;
};

PublicRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserID('');
    navigate('login');
  };

  return (
    <div className='App'>
      {/* Only render NavBar if user is logged in */}
      {isLoggedIn && (
        <NavBar 
          user={userID} 
          handleLogout={handleLogout}
        />
      )}
      
      <Routes>
        {/* Public routes */}
        <Route path="" element={
          <PublicRoute isLoggedIn={isLoggedIn}>
            <DashBoard isLoggedIn={isLoggedIn} />
          </PublicRoute>
        } />
        <Route path="login" element={
          <PublicRoute isLoggedIn={isLoggedIn}>
            <Login 
              isAuthenticated={isLoggedIn}
              setIsAuthenticated={setIsLoggedIn}
              setUserID={setUserID}
            />
          </PublicRoute>
        } />
        <Route path="signup" element={
          <PublicRoute isLoggedIn={isLoggedIn}>
            <SignUp />
          </PublicRoute>
        } />

        {/* Private routes */}
        <Route path="dashboard" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Home user={userID} />
          </PrivateRoute>
        } />
        <Route path="profile/edit" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <SignUp />
          </PrivateRoute>
        } />

        {/* Redirect undefined routes to root */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "dashboard" : ""} />} />
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
