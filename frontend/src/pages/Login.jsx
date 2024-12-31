import React, { useState, useCallback } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { FaDumbbell, FaEnvelope, FaLock } from 'react-icons/fa'; 
import { BsEmojiSmile } from 'react-icons/bs'; 
import { Form, Button, Container, Card, Spinner } from 'react-bootstrap';
import InputField from '../components/common/InputField';
import HeaderSection from '../components/common/HeaderSection';
import SubmitButton from '../components/common/SubmitButton';
import EmojiSection from '../components/common/EmojiSection';
import SignupLink from '../components/common/SignupLink';

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
    <Container fluid className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#d3d3d3' }}>
      <Card className="p-5 bg-light rounded shadow-lg text-center" style={{ width: '100%', maxWidth: '400px' }}>
        <Form onSubmit={onSubmit} aria-label="Login Form">
          <HeaderSection title="Fit-Track Login" icon={<FaDumbbell size={50} color="#ff6f61" />} />

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
        </Form>
      </Card>
    </Container>
  );
};

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
