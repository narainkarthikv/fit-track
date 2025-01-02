import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

const Button = ({ variant, onClick, children }) => (
  <BootstrapButton variant={variant} onClick={onClick}>
    {children}
  </BootstrapButton>
);

export default Button;
