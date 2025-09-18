import PropTypes from 'prop-types';
import { Button, Spinner } from 'react-bootstrap';

const SubmitButton = ({ isSubmitting, text = 'Sign In' }) => (
  <Button variant='danger' type='submit' block disabled={isSubmitting} aria-label={text}>
    {isSubmitting ? (
      <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
    ) : (
      text
    )}
  </Button>
);

SubmitButton.propTypes= {
  isSubmitting : PropTypes.func.isRequired,
  text: PropTypes.string
}

export default SubmitButton;
