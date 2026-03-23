import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  Box,
  useScrollTrigger,
  alpha,
  useTheme,
  Typography,
} from '@mui/material';
import { FitnessCenter as FaDumbbell } from '@mui/icons-material';

const LandingNav = ({ onSignInClick, onGetStartedClick }) => {
  const theme = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  return (
    <AppBar
      position="fixed"
      elevation={trigger ? 2 : 0}
      sx={{
        backgroundColor: trigger ? alpha(theme.palette.background.paper, 0.95) : 'transparent',
        backdropFilter: trigger ? 'blur(10px)' : 'none',
        borderBottom: trigger ? `1px solid ${theme.palette.divider}` : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, md: 72 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <FaDumbbell
              sx={{
                fontSize: 32,
                color: 'primary.main',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '1.25rem',
                letterSpacing: '-0.02em',
              }}
            >
              Fit-Track
            </Typography>
          </Box>

          {/* CTA Buttons */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              onClick={onSignInClick}
              variant="text"
              sx={{
                fontWeight: 600,
                px: 2.5,
                py: 1,
                fontSize: '0.9375rem',
                textTransform: 'none',
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              Sign In
            </Button>
            <Button
              onClick={onGetStartedClick}
              variant="contained"
              sx={{
                fontWeight: 600,
                px: 3,
                py: 1,
                fontSize: '0.9375rem',
                textTransform: 'none',
                boxShadow: `0 4px 12px 0 ${alpha(theme.palette.primary.main, 0.25)}`,
                '&:hover': {
                  boxShadow: `0 6px 16px 0 ${alpha(theme.palette.primary.main, 0.35)}`,
                },
              }}
            >
              Get Started Free
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

LandingNav.propTypes = {
  onSignInClick: PropTypes.func.isRequired,
  onGetStartedClick: PropTypes.func.isRequired,
};

export default LandingNav;
