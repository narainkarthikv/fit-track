import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Stack,
  alpha,
  keyframes,
} from '@mui/material';
import { ArrowForward, CheckCircleOutline } from '@mui/icons-material';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const gradientShift = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const Hero = ({ isLoggedIn, onGetStartedClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="section"
      sx={{
        minHeight: { xs: 'auto', md: '100svh' },
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.default',
        pt: { xs: 12, md: 'clamp(96px, 12vh, 140px)' },
        pb: { xs: 8, md: 'clamp(72px, 10vh, 120px)' },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '140%',
          height: '100%',
          background: `radial-gradient(ellipse at top, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 60%)`,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 70%)`,
          animation: `${float} 8s ease-in-out infinite`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
          {/* Centered Content */}
          <Grid
            item
            xs={12}
            md={10}
            lg={9}
            sx={{
              textAlign: 'center',
            }}
          >
            <Stack
              spacing={{ xs: 3, md: 3.5 }}
              alignItems="center"
              sx={{ maxWidth: '800px', mx: 'auto' }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4rem', lg: '4.5rem' },
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                  mb: 1,
                }}
              >
                Your fitness,{' '}
                <Box
                  component="span"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% 200%',
                    animation: `${gradientShift} 3s ease infinite`,
                  }}
                >
                  tracked simply
                </Box>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.7,
                  fontSize: { xs: '1.0625rem', md: '1.1875rem' },
                  maxWidth: '560px',
                  fontWeight: 400,
                  mx: 'auto',
                }}
              >
                Log workouts, monitor progress, and stay consistent. A straightforward tool for
                people serious about their fitness.
              </Typography>

              {/* Key Points */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 2, sm: 4 }}
                sx={{
                  mt: 2,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {['Track exercises', 'Monitor progress', 'Build habits'].map((point, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleOutline sx={{ color: 'primary.main', fontSize: 18 }} />
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.9375rem' }}
                    >
                      {point}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
                {isLoggedIn ? (
                  <Button
                    component={RouterLink}
                    to="/dashboard"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 4.5,
                      py: 1.75,
                      fontSize: '1rem',
                      fontWeight: 600,
                      boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.3)}`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 6px 20px 0 ${alpha(theme.palette.primary.main, 0.4)}`,
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <Button
                    onClick={onGetStartedClick}
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 4.5,
                      py: 1.75,
                      fontSize: '1rem',
                      fontWeight: 600,
                      boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.3)}`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 6px 20px 0 ${alpha(theme.palette.primary.main, 0.4)}`,
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    Start Tracking
                  </Button>
                )}
                <Button
                  href="#features"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4.5,
                    py: 1.75,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderWidth: '1.5px',
                    '&:hover': {
                      borderWidth: '1.5px',
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

Hero.propTypes = {
  isLoggedIn: PropTypes.bool,
  onGetStartedClick: PropTypes.func,
};

export default Hero;
