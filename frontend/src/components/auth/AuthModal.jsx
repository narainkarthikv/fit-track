import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Stack,
  Divider,
  Alert,
  LinearProgress,
  useTheme,
  alpha,
  Tabs,
  Tab,
} from '@mui/material';
import {
  DirectionsRun as FaRunning,
  FitnessCenter as FaDumbbell,
  Person as FaUser,
  Email as FaEnvelope,
  Lock as FaLock,
  Visibility as FaEye,
  VisibilityOff as FaEyeSlash,
  Close as CloseIcon,
  EmojiEmotions,
} from '@mui/icons-material';
import Lottie from 'react-lottie';
import loginAnimation from '../../assets/lottie/login-lottie.json';
import signupAnimation from '../../assets/lottie/signup-lottie.json';
import Snackbar from '../common/Snackbar';

const AuthModal = ({ open, onClose, initialMode = 'login', onAuthSuccess }) => {
  const theme = useTheme();
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  // Login state
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });

  // Signup state
  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("Let's Get Started!");

  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
      setError('');
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  };

  const handleLoginInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setLoginCredentials((prev) => ({ ...prev, [name]: value }));
    setError('');
  }, []);

  const handleSignupInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
    setError('');

    const filledFields = Object.values({ ...signupForm, [name]: value }).filter(
      (field) => field !== ''
    ).length;
    const newProgress = (filledFields / 4) * 100;
    setProgress(newProgress);
    updateProgressMessage(newProgress);
  }, [signupForm]);

  const updateProgressMessage = (progress) => {
    if (progress === 0) setProgressMessage("Let's Get Started!");
    else if (progress <= 25) setProgressMessage('Warming Up!');
    else if (progress <= 50) setProgressMessage('Hitting Your Stride!');
    else if (progress <= 75) setProgressMessage('Almost There!');
    else setProgressMessage('Final Stretch!');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const loginResponse = await fetch(`${backendURL}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(loginCredentials),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(data.message || data.error || 'Login failed');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      const userResponse = await fetch(`${backendURL}/api/user/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.message || 'Error fetching user details');
      }

      const users = await userResponse.json();
      const user = users.find((u) => u.email === loginCredentials.email);

      if (user) {
        setSnackbar({
          show: true,
          message: 'Welcome back! Redirecting...',
          type: 'success',
        });
        setTimeout(() => {
          onAuthSuccess(user._id);
          onClose();
        }, 1500);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login. Please try again.');
      setSnackbar({
        show: true,
        message: 'Login failed!',
        type: 'failure',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (signupForm.password !== signupForm.confirmpassword) {
      setError('Passwords do not match');
      return;
    }

    if (signupForm.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);

    const { confirmpassword, ...formData } = signupForm;

    try {
      const response = await fetch(`${backendURL}/api/user/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }

      setSnackbar({
        show: true,
        message: 'Account created! Please sign in.',
        type: 'success',
      });

      setTimeout(() => {
        setMode('login');
        setSignupForm({
          username: '',
          email: '',
          password: '',
          confirmpassword: '',
        });
        setProgress(0);
        setProgressMessage("Let's Get Started!");
      }, 2000);
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to sign up. Please try again.');
      setSnackbar({
        show: true,
        message: 'Sign up failed!',
        type: 'failure',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: mode === 'login' ? loginAnimation : signupAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: 'background.paper',
            backgroundImage: 'none',
          },
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            zIndex: 1,
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: alpha(theme.palette.text.primary, 0.08),
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              minHeight: { xs: 'auto', md: '600px' },
            }}
          >
            {/* Left Side - Animation */}
            <Box
              sx={{
                flex: { xs: '0 0 auto', md: '0 0 45%' },
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.primary.light, 0.1)} 100%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 4, md: 5 },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
                },
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                {mode === 'login' ? (
                  <FaDumbbell
                    sx={{
                      fontSize: 48,
                      color: 'primary.main',
                      mb: 2,
                    }}
                  />
                ) : (
                  <FaRunning
                    sx={{
                      fontSize: 48,
                      color: 'primary.main',
                      mb: 2,
                    }}
                  />
                )}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: 'text.primary',
                  }}
                >
                  {mode === 'login' ? 'Welcome Back!' : 'Join Fit-Track'}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 3,
                    maxWidth: '300px',
                    mx: 'auto',
                  }}
                >
                  {mode === 'login'
                    ? 'Track your fitness journey and stay consistent with your goals.'
                    : 'Start tracking your workouts and build lasting fitness habits.'}
                </Typography>
                <Box sx={{ maxWidth: '280px', mx: 'auto' }}>
                  <Lottie options={lottieOptions} height={200} width={200} />
                </Box>
              </Box>
            </Box>

            {/* Right Side - Form */}
            <Box
              sx={{
                flex: 1,
                p: { xs: 4, md: 5 },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Tabs
                  value={mode}
                  onChange={handleModeChange}
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    '& .MuiTab-root': {
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      minWidth: 120,
                    },
                  }}
                >
                  <Tab label="Sign In" value="login" />
                  <Tab label="Sign Up" value="signup" />
                </Tabs>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {mode === 'login' ? (
                // Login Form
                <Box
                  component="form"
                  onSubmit={handleLogin}
                  sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
                >
                  <Stack spacing={2.5} sx={{ flex: 1 }}>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}
                      >
                        Email
                      </Typography>
                      <TextField
                        fullWidth
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={loginCredentials.email}
                        onChange={handleLoginInputChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FaEnvelope sx={{ color: 'text.secondary', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}
                      >
                        Password
                      </Typography>
                      <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Enter your password"
                        value={loginCredentials.password}
                        onChange={handleLoginInputChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FaLock sx={{ color: 'text.secondary', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                size="small"
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <EmojiEmotions sx={{ color: 'primary.main', mr: 1, fontSize: 24 }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Feeling 💪 today?
                      </Typography>
                    </Box>
                  </Stack>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                    sx={{
                      mt: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                    }}
                  >
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                  </Button>
                </Box>
              ) : (
                // Signup Form
                <Box
                  component="form"
                  onSubmit={handleSignup}
                  sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
                >
                  <Stack spacing={2.5} sx={{ flex: 1 }}>
                    {progress > 0 && (
                      <Box sx={{ mb: 1 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 0.5,
                          }}
                        >
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {progressMessage}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {Math.round(progress)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: alpha(theme.palette.primary.main, 0.15),
                          }}
                        />
                      </Box>
                    )}

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}
                      >
                        Username
                      </Typography>
                      <TextField
                        fullWidth
                        name="username"
                        placeholder="Choose a username"
                        value={signupForm.username}
                        onChange={handleSignupInputChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FaUser sx={{ color: 'text.secondary', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}
                      >
                        Email
                      </Typography>
                      <TextField
                        fullWidth
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={signupForm.email}
                        onChange={handleSignupInputChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FaEnvelope sx={{ color: 'text.secondary', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}
                      >
                        Password
                      </Typography>
                      <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Create a password"
                        value={signupForm.password}
                        onChange={handleSignupInputChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FaLock sx={{ color: 'text.secondary', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                size="small"
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}
                      >
                        Confirm Password
                      </Typography>
                      <TextField
                        fullWidth
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmpassword"
                        placeholder="Confirm your password"
                        value={signupForm.confirmpassword}
                        onChange={handleSignupInputChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FaLock sx={{ color: 'text.secondary', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                                size="small"
                              >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Stack>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                    sx={{
                      mt: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                    }}
                  >
                    {isSubmitting ? 'Creating Account...' : 'Start Your Journey'}
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        show={snackbar.show}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ ...snackbar, show: false })}
      />
    </>
  );
};

AuthModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialMode: PropTypes.oneOf(['login', 'signup']),
  onAuthSuccess: PropTypes.func.isRequired,
};

export default AuthModal;
