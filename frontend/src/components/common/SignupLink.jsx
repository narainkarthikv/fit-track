import React from 'react';
import { Link } from 'react-router-dom';

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

export default SignupLink;
