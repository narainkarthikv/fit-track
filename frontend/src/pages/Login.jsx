import { useState, useCallback } from 'react';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import {
  FitnessCenter as FaDumbbell,
  Email as FaEnvelope,
  Lock as FaLock,
  Visibility as FaEye,
  VisibilityOff as FaEyeSlash,
  EmojiEmotions,
} from '@mui/icons-material';
import {
  Container,
  Card,
  CardContent,
  Box,
  Grid,
  Typography,
  Alert,
  Stack,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Lottie from 'react-lottie';
import animationData from '../assets/lottie/login-lottie.json';
import Snackbar from '../components/common/Snackbar';
import PropTypes from 'prop-types';

const LoginPage = ({ isAuthenticated, setIsAuthenticated, setUserID }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: '',
    type: 'success',
  });
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleLogin = useCallback(async () => {
    setIsSubmitting(true);
    setError('');

    try {
      console.log(`Attempting login to: ${backendURL}/api/user/login`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const loginResponse = await fetch(`${backendURL}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(data.message || data.error || 'Login failed');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('Token saved successfully');
      }

      const userResponse = await fetch(`${backendURL}/api/user/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(
          errorData.message || errorData.error || 'Error fetching user details'
        );
      }

      const users = await userResponse.json();
      const user = users.find((u) => u.email === credentials.email);

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
      console.error('Login error:', err);
      let errorMessage = 'Invalid user or password';

      if (err.name === 'AbortError') {
        errorMessage = 'Request timeout - backend not responding';
      } else if (err instanceof TypeError) {
        errorMessage = 'Network error - check if backend is running';
      } else {
        errorMessage = err.message;
      }

      setError(errorMessage);
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
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left Side - Animation */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box>
                <Lottie options={defaultOptions} height={450} width={450} />
              </Box>
            </Grid>

            {/* Right Side - Form */}
            <Grid item xs={12} md={6}>
              <Card
                  elevation={0}
                  sx={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '24px',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    overflow: 'hidden',
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mb: 2,
                        }}
                      >
                        <FaDumbbell
                          sx={{
                            fontSize: 48,
                            color: 'primary.main',
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: 'text.primary',
                          mb: 1,
                        }}
                      >
                        Fit-Track Login
                      </Typography>
                    </Box>

                    <Box component="form" onSubmit={onSubmit}>
                      <Stack spacing={3}>
                        {/* Email Field */}
                        <TextField
                          fullWidth
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={credentials.email}
                          onChange={handleInputChange}
                          required
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <FaEnvelope sx={{ color: 'text.secondary' }} />
                              </InputAdornment>
                            ),
                          }}
                        />

                        {/* Password Field */}
                        <TextField
                          fullWidth
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={credentials.password}
                          onChange={handleInputChange}
                          required
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <FaLock sx={{ color: 'text.secondary' }} />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={togglePasswordVisibility}
                                  edge="end"
                                  sx={{ color: 'text.secondary' }}
                                >
                                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />

                        {/* Error Message */}
                        {error && (
                          <Alert severity="error">
                            {error}
                          </Alert>
                        )}

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          disabled={isSubmitting}
                          sx={{
                            py: 1.5,
                          }}
                        >
                          {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </Button>

                        {/* Signup Link */}
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            New to Fit-Track?{' '}
                            <Typography
                              component={RouterLink}
                              to="/signup"
                              sx={{
                                color: 'primary.main',
                                textDecoration: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                  textDecoration: 'underline',
                                },
                              }}
                            >
                              Sign Up Now
                            </Typography>
                          </Typography>
                        </Box>

                        {/* Motivational Section */}
                        <Box
                          sx={{
                            textAlign: 'center',
                            mt: 3,
                            pt: 3,
                            borderTop: '1px solid',
                            borderColor: 'divider',
                          }}
                        >
                          <EmojiEmotions sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                            }}
                          >
                            Feeling 💪 today?
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Snackbar
        show={snackbar.show}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() =>
          setSnackbar({ show: false, message: '', type: 'success' })
        }
      />
    </>
  );
};

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
  setUserID: PropTypes.func.isRequired,
};

export default LoginPage;
