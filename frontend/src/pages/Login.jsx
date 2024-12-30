import React, { useState, useCallback } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { FaDumbbell, FaEnvelope, FaLock } from 'react-icons/fa'; 
import { BsEmojiSmile } from 'react-icons/bs'; 
import InputField from '../components/common/InputField';

const LoginPage = ({ isAuthenticated, setIsAuthenticated, setUserID }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emoji, setEmoji] = useState('🏋️‍♀️'); 
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000'; 
  const navigate = useNavigate();

  const handleInputChange = useCallback((e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleLogin = useCallback(async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const loginResponse = await fetch(`${backendURL}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const userResponse = await fetch(`${backendURL}/api/user/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.message || 'Error fetching user details');
      }

      const users = await userResponse.json();
      const user = users.find((user) => user.email === credentials.email);

      if (user) {
        setIsAuthenticated(true);
        setUserID(user._id);
        navigate(`/${user._id}`);
      } else {
        throw new Error('User not found');
      }
    } catch (err) {
      setError(err.message || 'Invalid user or password');
    } finally {
      setIsSubmitting(false);
    }
  }, [backendURL, credentials, navigate, setIsAuthenticated, setUserID]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { email, password } = credentials;

      if (email && password) {
        handleLogin();
      } else {
        setError('Please enter both email and password');
      }
    },
    [credentials, handleLogin]
  );

  const handleEmojiChange = useCallback(() => {
    const fitnessEmojis = ['💪', '🏃‍♂️', '🤸‍♀️', '🚴‍♂️', '🏋️‍♀️', '🤾‍♂️', '🏊‍♂️'];
    setEmoji(fitnessEmojis[Math.floor(Math.random() * fitnessEmojis.length)]);
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#d3d3d3' }}>
      <form className="p-5 bg-light rounded shadow-lg" onSubmit={onSubmit} style={{ width: '100%', maxWidth: '400px' }} aria-label="Login Form">
        
        <HeaderSection />

        {['email', 'password'].map((field, index) => (
          <InputField
            key={index}
            id={field}
            name={field}
            type={field === 'password' ? 'password' : 'email'}
            placeholder={`Enter your ${field}`}
            value={credentials[field]}
            onChange={handleInputChange}
            Icon={getIcon(field)}
          />
        ))}

        <SubmitButton isSubmitting={isSubmitting} />

        {error && <div className="text-danger text-center mt-3" role="alert">{error}</div>}

        <SignupLink />

        <EmojiSection emoji={emoji} onClick={handleEmojiChange} />
      </form>
    </div>
  );
};

const HeaderSection = () => (
  <div className="text-center mb-4">
    <FaDumbbell size={50} color="#ff6f61" aria-hidden="true" />
    <h1 className="text-center mt-2" style={{ color: '#ff6f61' }}>Fit-Track Login</h1>
  </div>
);

const SubmitButton = ({ isSubmitting }) => (
  <button className="btn btn-danger btn-block" type="submit" disabled={isSubmitting} aria-label="Sign In">
    {isSubmitting ? (
      <div className="spinner-border spinner-border-sm text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
      'Sign In'
    )}
  </button>
);

const SignupLink = () => (
  <div className="text-center mt-4">
    <small>
      New to Fit-Track?{' '}
      <Link className="text-primary" to="/signup" aria-label="Sign Up">
        Sign Up Now
      </Link>
    </small>
  </div>
);

const EmojiSection = ({ emoji, onClick }) => (
  <div className="text-center mt-5" onClick={onClick} style={{ cursor: 'pointer', fontSize: '1.5rem' }}>
    <BsEmojiSmile size={40} />
    <span className="ml-3" aria-live="polite" style={{ fontWeight: 'bold' }}>
      Feeling {emoji} today?
    </span>
  </div>
);

const getIcon = (field) => {
  switch (field) {
    case 'email':
      return FaEnvelope;
    case 'password':
      return FaLock;
    default:
      return null;
  }
};

export default LoginPage;
