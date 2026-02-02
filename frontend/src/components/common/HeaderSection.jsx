import PropTypes from 'prop-types';
import React from 'react';
import { Box, Typography } from '@mui/material';

const HeaderSection = ({ title, icon }) => (
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    {icon &&
      React.cloneElement(icon, {
        'data-testid': 'header-section-icon',
        sx: { fontSize: 48, color: 'primary.main', mb: 1 },
      })}
    <Typography
      variant="h3"
      sx={{
        color: 'primary.main',
        fontWeight: 700,
        letterSpacing: '0.5px',
      }}
      data-testid="header-title"
    >
      {title}
    </Typography>
  </Box>
);

HeaderSection.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

export default HeaderSection;
