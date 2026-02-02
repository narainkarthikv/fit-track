import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, 
  Grid, 
  Box, 
  Typography,
  Paper,
  Stack,
  alpha,
  useTheme,
  Fade,
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon,
  EmojiEvents as TrophyIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import Card from '../components/common/Card';
import ExercisesList from '../components/ExercisesList';
import Quotes from '../components/Quotes';
import UserRoutine from '../components/UserRoutine';
import UserExperience from '../components/UserExperience';
import TotalDays from '../components/TotalDays';
import HeatMap from '../components/HeatMap';

// Premium Stats Card Component
const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => {
  const theme = useTheme();
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(color || theme.palette.primary.main, 0.05)} 0%, ${alpha(color || theme.palette.primary.main, 0.01)} 100%)`,
        border: '1px solid',
        borderColor: alpha(color || theme.palette.primary.main, 0.1),
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 24px ${alpha(color || theme.palette.primary.main, 0.15)}`,
          borderColor: alpha(color || theme.palette.primary.main, 0.3),
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px',
          height: '100px',
          background: `radial-gradient(circle, ${alpha(color || theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
          borderRadius: '50%',
          transform: 'translate(30%, -30%)',
        },
      }}
    >
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: '0.75rem',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mt: 1,
                fontSize: '2rem',
                background: `linear-gradient(135deg, ${color || theme.palette.primary.main} 0%, ${alpha(color || theme.palette.primary.main, 0.7)} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {Icon && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: alpha(color || theme.palette.primary.main, 0.1),
              }}
            >
              <Icon sx={{ fontSize: 24, color: color || 'primary.main' }} />
            </Box>
          )}
        </Box>
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
            <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>
              {trend}
            </Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

const Home = ({ user }) => {
  const theme = useTheme();
  const [userDetails, setUserDetails] = useState({
    username: '',
    xp: 0,
    totalDays: 0,
  });
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const backendURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backendURL}/api/user/${user}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data);
      } catch (err) {
        console.error('Error fetching the user', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user, backendURL]);

  useEffect(() => {
    if (!quote) {
      const fetchQuote = async () => {
        try {
          const response = await axios.get(
            'https://api.api-ninjas.com/v2/quotes',
            {
              params: {
                categories: 'success, inspirational, life, courage',
              },
              headers: {
                'X-Api-Key': import.meta.env.VITE_APININJAS,
              },
            }
          );
          
          if (response.data && response.data.length > 0) {
            setQuote(response.data[0]);
          } else {
            // Fallback quote object
            setQuote({
              quote: "The only bad workout is the one that didn't happen.",
              author: "Unknown",
              work: "",
              categories: ["fitness"]
            });
          }
        } catch (err) {
          console.error('Error fetching Quotes', err);
          // Fallback quote object
          setQuote({
            quote: "The only bad workout is the one that didn't happen.",
            author: "Unknown",
            work: "",
            categories: ["fitness"]
          });
        }
      };

      fetchQuote();
    }
  }, [quote]);

  return (
    <Box 
      component="main" 
      sx={{ 
        flexGrow: 1, 
        minHeight: '100vh',
        backgroundColor: 'background.default',
        pt: { xs: 2, md: 3 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="xl">
        <Fade in={!loading} timeout={800}>
          <Box>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  fontSize: { xs: '1.75rem', md: '2rem' },
                }}
              >
                Welcome back, {userDetails.username || 'Athlete'} 👋
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: '1rem',
                }}
              >
                Track your progress and crush your fitness goals
              </Typography>
            </Box>

            {/* Stats Overview - Top Row */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={4}>
                <StatCard
                  title="Experience Points"
                  value={userDetails.xp || 0}
                  subtitle="XP earned from workouts"
                  icon={TrophyIcon}
                  color={theme.palette.primary.main}
                  trend="+12% this week"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <StatCard
                  title="Active Days"
                  value={userDetails.totalDays || 0}
                  subtitle="Days worked out this week"
                  icon={CalendarIcon}
                  color={theme.palette.success.main}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.05)} 0%, ${alpha(theme.palette.info.main, 0.01)} 100%)`,
                    border: '1px solid',
                    borderColor: alpha(theme.palette.info.main, 0.1),
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderColor: alpha(theme.palette.info.main, 0.3),
                    },
                  }}
                >
                  <Quotes quote={quote} />
                </Paper>
              </Grid>
            </Grid>

            {/* Main Content Section */}
            <Grid container spacing={3}>
              {/* Left Column - Today's Exercises */}
              <Grid item xs={12} lg={7}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, md: 3 },
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    height: '100%',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      fontSize: '1.125rem',
                    }}
                  >
                    Today's Exercises
                  </Typography>
                  <ExercisesList userID={user} />
                </Paper>
              </Grid>

              {/* Right Column - Activity & Progress */}
              <Grid item xs={12} lg={5}>
                <Stack spacing={3}>
                  {/* Current Streak */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 2, md: 3 },
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        fontSize: '1.125rem',
                      }}
                    >
                      Current Streak
                    </Typography>
                    <UserRoutine userID={user} setUserDetails={setUserDetails} />
                  </Paper>

                  {/* Activity Heatmap */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 2, md: 3 },
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        fontSize: '1.125rem',
                      }}
                    >
                      Activity Heatmap
                    </Typography>
                    <HeatMap userID={user} setUserDetails={setUserDetails} />
                  </Paper>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Home;
