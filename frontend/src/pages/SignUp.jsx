import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {
  DirectionsRun as FaRunning,
  Person as FaUser,
  Email as FaEnvelope,
  Lock as FaLock,
  Visibility as FaEye,
  VisibilityOff as FaEyeSlash,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  LinearProgress,
  Typography,
  Alert,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Container,
} from '@mui/material';
import Lottie from 'react-lottie';
import animationData from '../assets/lottie/signup-lottie.json';
import Snackbar from '../components/common/Snackbar';

const SignUp = () => {
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Let's Get Started!");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: '',
    type: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));

    const filledFields = Object.values({ ...formState, [name]: value }).filter(
      (field) => field !== ''
    ).length;
    const newProgress = (filledFields / 4) * 100;
    setProgress(newProgress);
    updateMessage(newProgress);
  };

  const updateMessage = (progress) => {
    if (progress === 0) setMessage("Let's Get Started!");
    else if (progress <= 25) setMessage('Warming Up!');
    else if (progress <= 50) setMessage('Hitting Your Stride!');
    else if (progress <= 75) setMessage('Almost There!');
    else setMessage('Final Stretch!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formState.password !== formState.confirmpassword) {
      setError('Passwords do not match');
      return;
    }

    const { confirmpassword, ...formData } = formState;

    try {
      const response = await axios.post(`${backendURL}/api/user/add`, formData);
      setSnackbar({
        show: true,
        message: 'Sign up successful!',
        type: 'success',
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      console.log('User added successfully: ', response);
    } catch (error) {
      setError('Failed to sign up');
      setSnackbar({ show: true, message: 'Sign up failed!', type: 'failure' });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mb: 2,
                        }}
                      >
                        <FaRunning
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
                        Join Fit-Track
                      </Typography>
                    </Box>

                    {/* Progress Indicator */}
                    <Box sx={{ mb: 3 }}>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                          height: 6,
                          borderRadius: 1,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: 'center',
                          mt: 1,
                          color: 'primary.main',
                          fontWeight: 600,
                        }}
                      >
                        {message}
                      </Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit}>
                      <Stack spacing={2.5}>
                        {/* Username Field */}
                        <TextField
                          fullWidth
                          id="username"
                          name="username"
                          type="text"
                          placeholder="Choose a username"
                          value={formState.username}
                          onChange={handleChange}
                          required
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <FaUser sx={{ color: 'text.secondary' }} />
                              </InputAdornment>
                            ),
                          }}
                        />

                        {/* Email Field */}
                        <TextField
                          fullWidth
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formState.email}
                          onChange={handleChange}
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
                          placeholder="Create a password"
                          value={formState.password}
                          onChange={handleChange}
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

                        {/* Confirm Password Field */}
                        <TextField
                          fullWidth
                          id="confirmpassword"
                          name="confirmpassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          value={formState.confirmpassword}
                          onChange={handleChange}
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
                                  onClick={toggleConfirmPasswordVisibility}
                                  edge="end"
                                  sx={{ color: 'text.secondary' }}
                                >
                                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
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
                          sx={{
                            py: 1.5,
                            mt: 1,
                          }}
                        >
                          Start Your Journey
                        </Button>

                        {/* Login Link */}
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Already have an account?{' '}
                            <Typography
                              component={RouterLink}
                              to="/login"
                              sx={{
                                color: 'primary.main',
                                textDecoration: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                  textDecoration: 'underline',
                                },
                              }}
                            >
                              Log in
                            </Typography>
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
        onClose={() => setSnackbar({ show: false, message: '', type: '' })}
      />
    </>
  );
};

export default SignUp;
