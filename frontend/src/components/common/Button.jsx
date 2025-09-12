import { Button as BootstrapButton } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Button = ({ variant, onClick, children }) => (
  <BootstrapButton variant={variant} onClick={onClick}>
    {children}
  </BootstrapButton>
);

Button.propTypes = {
  variant: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
