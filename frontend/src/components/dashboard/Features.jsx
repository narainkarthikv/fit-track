import React from 'react';
import {
  AccountCircle as FaUserCircle,
  DirectionsRun as FaRunning,
  EventNote as FaCalendarPlus,
  Whatshot as FaFire,
  TrendingUp as FaChartLine,
  Insights as FaInsights,
} from '@mui/icons-material';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

const Features = () => {
  const theme = useTheme();
  const features = [
    {
      icon: <FaRunning />,
      title: 'Log workouts in seconds',
      description:
        'Capture sets, reps, weight, and notes without breaking your flow. Everything stays tidy and searchable.',
      color: '#3B82F6',
    },
    {
      icon: <FaChartLine />,
      title: 'See progress at a glance',
      description:
        'Trends, streaks, and personal bests surface fast so you know what is working and what to adjust.',
      color: '#60A5FA',
    },
    {
      icon: <FaFire />,
      title: 'Stay consistent',
      description: 'Gentle nudges and streaks keep you showing up. Motivation without the noise.',
      color: '#1E40AF',
    },
    {
      icon: <FaCalendarPlus />,
      title: 'Build your routine',
      description:
        'Create custom exercises and templates that match how you train, then reuse them anytime.',
      color: '#2563EB',
    },
    {
      icon: <FaUserCircle />,
      title: 'Your personal space',
      description:
        'A focused dashboard built around your goals. No distractions, no comparison feeds.',
      color: '#38BDF8',
    },
    {
      icon: <FaInsights />,
      title: 'Smart summaries',
      description:
        'Weekly snapshots highlight volume, time, and consistency so you can course-correct fast.',
      color: '#0EA5E9',
    },
  ];

  return (
    <Box
      component="section"
      id="features"
      sx={{
        py: 'clamp(64px, 9vh, 112px)',
        scrollMarginTop: { xs: '72px', md: '88px' },
        backgroundColor: 'background.paper',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 60%)`,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-120px',
          right: '-80px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.14)} 0%, transparent 70%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 7 } }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.75rem' },
              letterSpacing: '-0.01em',
            }}
          >
            What you can do
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.05rem' },
              fontWeight: 400,
            }}
          >
            Focused tools that make it easy to log, review, and stay consistent without the clutter.
          </Typography>
        </Box>
        {/* Responsive Asymmetric Grid Layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(12, 1fr)',
            },
            gap: { xs: 2.5, sm: 3, md: 3 },
            gridAutoFlow: { xs: 'row', sm: 'row', md: 'dense' },
          }}
        >
          {features.map((feature, idx) => {
            // Define unique grid layouts for asymmetric masonry effect
            const gridAreas = {
              0: { xs: '1', sm: '1 / span 2', md: '1 / span 6' }, // Hero - Large
              1: { xs: '1', sm: '1', md: '7 / span 3' }, // Medium
              2: { xs: '1', sm: '1', md: '10 / span 3' }, // Tall
              3: { xs: '1', sm: '1', md: '1 / span 4' }, // Medium
              4: { xs: '1', sm: '1', md: '5 / span 4' }, // Medium
              5: { xs: '1', sm: '1', md: '9 / span 4' }, // Wide
            };

            const minHeights = {
              0: { xs: 'auto', sm: 'auto', md: '360px' }, // Hero
              1: { xs: 'auto', sm: 'auto', md: '180px' }, // Medium
              2: { xs: 'auto', sm: 'auto', md: '360px' }, // Tall
              3: { xs: 'auto', sm: 'auto', md: '180px' }, // Medium
              4: { xs: 'auto', sm: 'auto', md: '180px' }, // Medium
              5: { xs: 'auto', sm: 'auto', md: '180px' }, // Wide
            };

            const isHero = idx === 0;
            const isTall = idx === 2;

            return (
              <Card
                key={idx}
                elevation={0}
                sx={{
                  gridColumn: gridAreas[idx],
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: minHeights[idx],
                  p: { xs: 3, sm: 3.5, md: isHero ? 4.5 : 3.5 },
                  backgroundColor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: isHero ? '5px' : '3px',
                    background: `linear-gradient(90deg, ${feature.color}, ${feature.color}80)`,
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                  },
                  '&:hover': {
                    transform: {
                      xs: 'translateY(-2px)',
                      md: isHero ? 'translateY(-6px) scale(1.01)' : 'translateY(-5px)',
                    },
                    borderColor: feature.color,
                    boxShadow: {
                      xs: `0 8px 16px -8px ${feature.color}30`,
                      md: `0 16px 32px -12px ${feature.color}40`,
                    },
                    backgroundColor: 'background.paper',
                    '&::before': {
                      opacity: 1,
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    width: {
                      xs: 52,
                      sm: isHero ? 60 : 52,
                      md: isHero ? 64 : isTall ? 52 : 48,
                    },
                    height: {
                      xs: 52,
                      sm: isHero ? 60 : 52,
                      md: isHero ? 64 : isTall ? 52 : 48,
                    },
                    borderRadius: isHero ? 2 : 1.5,
                    backgroundColor: `${feature.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: { xs: 2, sm: 2, md: isHero ? 3 : 2 },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'rotate(5deg) scale(1.05)',
                      backgroundColor: `${feature.color}25`,
                    },
                  }}
                >
                  {React.cloneElement(feature.icon, {
                    sx: {
                      fontSize: {
                        xs: '1.625rem',
                        sm: isHero ? '1.875rem' : '1.625rem',
                        md: isHero ? '2rem' : isTall ? '1.75rem' : '1.5rem',
                      },
                      color: feature.color,
                    },
                  })}
                </Box>
                <CardContent sx={{ p: 0, flex: 1, textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      mb: { xs: 1, sm: 1, md: isHero ? 1.5 : 1 },
                      fontWeight: 600,
                      fontSize: {
                        xs: '1.0625rem',
                        sm: isHero ? '1.125rem' : '1.0625rem',
                        md: isHero ? '1.25rem' : '1.0625rem',
                      },
                      letterSpacing: '-0.01em',
                      background: isHero
                        ? `linear-gradient(135deg, ${feature.color}, ${feature.color}CC)`
                        : 'inherit',
                      backgroundClip: isHero ? 'text' : 'unset',
                      WebkitBackgroundClip: isHero ? 'text' : 'unset',
                      WebkitTextFillColor: isHero ? 'transparent' : 'unset',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.65,
                      fontSize: {
                        xs: '0.875rem',
                        sm: isHero ? '0.9375rem' : '0.875rem',
                      },
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Features;
