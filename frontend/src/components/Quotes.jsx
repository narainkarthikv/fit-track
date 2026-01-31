import React from 'react';
import { Box, Typography } from '@mui/material';
import { FormatQuote } from '@mui/icons-material';

const Quotes = ({ quote }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: 2,
      height: '100%',
      justifyContent: 'center',
      position: 'relative',
    }}>
      <FormatQuote 
        sx={{ 
          position: 'absolute',
          top: -8,
          left: -8,
          fontSize: 48,
          color: 'primary.main',
          opacity: 0.2,
          transform: 'rotate(180deg)',
        }} 
      />
      
      <Typography 
        variant="body2" 
        sx={{ 
          color: 'text.secondary',
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        Quote of the Day
      </Typography>
      
      <Typography 
        sx={{ 
          fontSize: '1rem',
          lineHeight: 1.6,
          color: 'primary.light',
          fontStyle: 'italic',
          fontWeight: 500,
          position: 'relative',
          zIndex: 1,
        }}
      >
        "{quote}"
      </Typography>
      
      <FormatQuote 
        sx={{ 
          position: 'absolute',
          bottom: -8,
          right: -8,
          fontSize: 48,
          color: 'primary.main',
          opacity: 0.2,
        }} 
      />
    </Box>
  );
};

export default Quotes;
