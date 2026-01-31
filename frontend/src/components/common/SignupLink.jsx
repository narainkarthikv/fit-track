import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Typography, Link } from '@mui/material';

const SignupLink = ({
  text = 'New to Fit-Track?',
  linkText = 'Sign Up Now',
  linkTo = '/signup',
}) => (
  <Box sx={{ textAlign: 'center', mt: 3 }}>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {text}{' '}
      <Link
        component={RouterLink}
        to={linkTo}
        sx={{
          color: 'primary.main',
          fontWeight: 700,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
        aria-label={linkText}
      >
        {linkText}
      </Link>
    </Typography>
  </Box>
);

SignupLink.propTypes = {
  text: PropTypes.string,
  linkText: PropTypes.string,
  linkTo: PropTypes.string,
};

export default SignupLink;
