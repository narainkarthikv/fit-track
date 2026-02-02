import { Button as MuiButton } from '@mui/material';
import PropTypes from 'prop-types';

const Button = ({
  variant = 'contained',
  onClick,
  children,
  disabled = false,
  fullWidth = false,
  size = 'medium',
  sx = {},
}) => (
  <MuiButton
    variant={variant}
    onClick={onClick}
    disabled={disabled}
    fullWidth={fullWidth}
    size={size}
    sx={{
      textTransform: 'none',
      fontWeight: 600,
      ...sx,
    }}
  >
    {children}
  </MuiButton>
);

Button.propTypes = {
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  sx: PropTypes.object,
};

export default Button;
