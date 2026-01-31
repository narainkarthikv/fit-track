import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@mui/material';

const SubmitButton = ({ isSubmitting, text = 'Sign In' }) => (
  <Button
    variant="contained"
    type="submit"
    disabled={isSubmitting}
    fullWidth
    size="large"
    sx={{
      py: 1.5,
      fontSize: '1.1rem',
      fontWeight: 600,
    }}
    aria-label={text}
  >
    {isSubmitting ? (
      <CircularProgress size={24} sx={{ color: 'inherit' }} data-testid="submit-spinner" />
    ) : (
      text
    )}
  </Button>
);

SubmitButton.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  text: PropTypes.string,
};

export default SubmitButton;
