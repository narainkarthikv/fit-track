import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const CTA = ({ isLoggedIn }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="section"
      id="cta"
      sx={{
        py: { xs: 8, md: 10 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: 'center',
            p: { xs: 3.5, md: 5 },
            borderRadius: 2.5,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            },
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2.5,
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              letterSpacing: '-0.01em',
            }}
          >
            Start tracking today
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              mb: 4,
              fontSize: { xs: '1rem', md: '1.0625rem' },
              maxWidth: '480px',
              mx: 'auto',
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            Join others who are using Fit-Track to stay consistent with their fitness.
            No commitments, just simple workout tracking.
          </Typography>

          <Button
            component={RouterLink}
            to={isLoggedIn ? 'dashboard' : 'signup'}
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            sx={{
              px: 4,
              py: 1.75,
              fontSize: '1rem',
              boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.25)}`,
              '&:hover': {
                boxShadow: `0 6px 20px 0 ${alpha(theme.palette.primary.main, 0.35)}`,
              },
            }}
          >
            {isLoggedIn ? 'Go to Dashboard' : 'Get Started Free'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

CTA.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default CTA;
