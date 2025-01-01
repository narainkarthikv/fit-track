import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserID('');
    navigate('/login');
  };

  const renderLogin = () => (
    isLoggedIn ? <Navigate to='/' /> : 
    <Login 
      isAuthenticated={isLoggedIn} 
      setIsAuthenticated={setIsLoggedIn} 
      setUserID={setUserID} 
    />
  );

  const renderHome = () => (
    isLoggedIn ? <Home user={userID} /> : <Navigate to='/login' />
  );

  return (
    <div className='App'>
      {isLoggedIn && (
        <NavBar 
          user={userID} 
          handleLogout={handleLogout}
        />
      )}
      <Routes>
        <Route path='/login' element={renderLogin()} />
        <Route path={`/${userID}`} element={renderHome()} />
        <Route path={`/${userID}/edit`} element={<SignUp />} />
        <Route path='/signup' element={<SignUp />} />
        {/* Redirect undefined routes to root */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
