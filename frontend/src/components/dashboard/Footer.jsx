import React from 'react';
import PropTypes from 'prop-types';

const Footer = () => (
  <footer className="bg-dark text-white text-center py-3">
    <p>&copy; {new Date().getFullYear()} Fit-Track. All rights reserved.</p>
  </footer>
);

Footer.propTypes = {};

export default Footer;
