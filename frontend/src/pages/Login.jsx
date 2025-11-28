import { useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import {
  FaDumbbell,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import { Form, Container, Card } from 'react-bootstrap';
import InputField from '../components/common/InputField';
import HeaderSection from '../components/common/HeaderSection';
import SubmitButton from '../components/common/SubmitButton';
import EmojiSection from '../components/common/EmojiSection';
import SignupLink from '../components/common/SignupLink';
import Lottie from 'react-lottie';
import animationData from '../assets/lottie/login-lottie.json';
import Snackbar from '../components/common/Snackbar';
import PropTypes from 'prop-types';

const LoginPage = ({ isAuthenticated, setIsAuthenticated, setUserID }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emoji, setEmoji] = useState('🏋️‍♀️');
  const [showPassword, setShowPassword] = useState(false);

  //must start with a value in order to have no errors
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: '',
    type: 'success',
  });
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

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

      const data = await loginResponse.json();

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.message || 'Login failed');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('Token saved:', data.token);
      } else {
        console.warn('No token received from backend');
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
        setSnackbar({
          show: true,
          message: 'Login successful!',
          type: 'success',
        });
        setTimeout(() => {
          setIsAuthenticated(true);
          setUserID(user._id);
        }, 3000);
      } else {
        throw new Error('User not found');
      }
    } catch (err) {
      setError(err.message || 'Invalid user or password');
      setSnackbar({ show: true, message: 'Login failed!', type: 'failure' });
    } finally {
      setIsSubmitting(false);
    }
  }, [backendURL, credentials, setIsAuthenticated, setUserID]);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center vh-100 p-0"
      >
        <div className="d-flex w-100 h-100">
          <div
            className="d-none d-md-flex align-items-center justify-content-center flex-grow-1"
            style={{ backgroundColor: '#ffffff', cursor: 'default' }}
          >
            <Lottie options={defaultOptions} height={500} width={500} />
          </div>
          <div className="d-flex align-items-center justify-content-center flex-grow-1">
            <Card
              className="p-5 bg-white rounded shadow-lg"
              style={{
                width: '100%',
                maxWidth: '450px',
                border: '1px solid #ccc',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Form onSubmit={onSubmit} aria-label="Login Form">
                <HeaderSection
                  title="Fit-Track Login"
                  icon={<FaDumbbell size={50} color="#ff6f61" />}
                />

                {['email', 'password'].map((field, index) => (
                  <InputField
                    key={index}
                    id={field}
                    name={field}
                    type={
                      field === 'password' && !showPassword
                        ? 'password'
                        : 'text'
                    }
                    placeholder={`Enter your ${field}`}
                    value={credentials[field]}
                    onChange={handleInputChange}
                    Icon={getIcon(field)}
                    AppendIcon={
                      field === 'password'
                        ? showPassword
                          ? FaEyeSlash
                          : FaEye
                        : null
                    }
                    onAppendIconClick={
                      field === 'password' ? togglePasswordVisibility : null
                    }
                    className="mb-3"
                  />
                ))}

                <div className="d-flex justify-content-center">
                  <SubmitButton
                    isSubmitting={isSubmitting}
                    className="w-100 mb-3"
                  />
                </div>

                {error && (
                  <div className="text-danger text-center mt-3" role="alert">
                    {error}
                  </div>
                )}

                <SignupLink className="text-center" />

                <EmojiSection
                  emoji={emoji}
                  onClick={handleEmojiChange}
                  className="text-center mt-3"
                />
              </Form>
            </Card>
          </div>
        </div>
      </Container>
      <Snackbar
        show={snackbar.show}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ show: false, message: '', type: '' })}
      />
    </>
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
LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
  setUserID: PropTypes.func.isRequired,
};

export default LoginPage;
