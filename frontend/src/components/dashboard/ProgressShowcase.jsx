import React from 'react';
import { Box, Container, Typography, alpha, useTheme, Grid, Stack } from '@mui/material';
import { TrendingUp, CalendarMonth, Whatshot } from '@mui/icons-material';

const ProgressShowcase = () => {
  const theme = useTheme();

  const stats = [
    { label: 'Weekly Trend', value: '+12%', icon: <TrendingUp />, color: '#60A5FA' },
    { label: 'Current Streak', value: '7 days', icon: <Whatshot />, color: '#3B82F6' },
    { label: 'This Month', value: '18 workouts', icon: <CalendarMonth />, color: '#1E40AF' },
  ];

  return (
    <Box
      component="section"
      id="track-your-progress"
      sx={{
        py: 'clamp(64px, 9vh, 112px)',
        scrollMarginTop: { xs: '72px', md: '88px' },
        textAlign: 'center',
        backgroundColor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, transparent 0%, ${alpha(theme.palette.primary.main, 0.06)} 100%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '2rem', md: '2.75rem' },
            letterSpacing: '-0.01em',
          }}
        >
          Track your progress
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: { xs: 5, md: 6 },
            color: 'text.secondary',
            maxWidth: '560px',
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.05rem' },
            fontWeight: 400,
          }}
        >
          Visual insights into your workout patterns. See your streaks, frequency, and trends at a
          glance.
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={{ xs: 2, md: 2.5 }} sx={{ mb: { xs: 4, md: 5 } }}>
          {stats.map((stat, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: 'background.paper',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: stat.color,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 16px -8px ${stat.color}30`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1.5,
                    backgroundColor: `${stat.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {React.cloneElement(stat.icon, {
                    sx: { fontSize: '1.5rem', color: stat.color },
                  })}
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 0.5,
                    color: 'text.primary',
                    fontSize: '1.75rem',
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Abstract Heatmap Visualization */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            p: { xs: 3, md: 4 },
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              textAlign: 'center',
              mb: 2,
              color: 'text.secondary',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600,
            }}
          >
            Activity Heatmap
          </Typography>
          <Stack spacing={1}>
            {[...Array(7)].map((_, weekIdx) => (
              <Stack key={weekIdx} direction="row" spacing={1}>
                {[...Array(52)].map((_, dayIdx) => {
                  const intensity = Math.random();
                  return (
                    <Box
                      key={dayIdx}
                      sx={{
                        width: '100%',
                        height: { xs: '12px', md: '14px' },
                        borderRadius: 0.5,
                        backgroundColor:
                          intensity > 0.7
                            ? alpha(theme.palette.primary.main, 0.8)
                            : intensity > 0.4
                              ? alpha(theme.palette.primary.main, 0.4)
                              : intensity > 0.2
                                ? alpha(theme.palette.primary.main, 0.2)
                                : alpha(theme.palette.divider, 0.3),
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'scale(1.2)',
                          zIndex: 1,
                        },
                      }}
                    />
                  );
                })}
              </Stack>
            ))}
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mt: 2 }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
              Less
            </Typography>
            {[0.2, 0.4, 0.6, 0.8].map((intensity, idx) => (
              <Box
                key={idx}
                sx={{
                  width: 14,
                  height: 14,
                  borderRadius: 0.5,
                  backgroundColor: alpha(theme.palette.primary.main, intensity),
                }}
              />
            ))}
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
              More
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default ProgressShowcase;
