import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SignupLink = ({ text = 'New to Fit-Track?', linkText = 'Sign Up Now', linkTo = '/signup' }) => (
  <div className='text-center mt-4'>
    <small>
      {text}{' '}
      <Link className='text-primary' to={linkTo} aria-label={linkText}>
        {linkText}
      </Link>
    </small>
  </div>
);

SignupLink.propTypes = {
  text: PropTypes.string,
  linkText: PropTypes.string,
  linkTo: PropTypes.string,
};

export default SignupLink;
