import { Card as MuiCard, CardContent, CardHeader, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const Card = ({ title, text, children, sx = {} }) => (
  <MuiCard
    elevation={0}
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
      },
      ...sx,
    }}
  >
    {title && (
      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
            {title}
          </Typography>
        }
        sx={{ pb: 1 }}
      />
    )}
    <CardContent sx={{ 
      flex: 1, 
      p: 3,
      '&:last-child': {
        pb: 3,
      },
    }}>
      {text && <Typography variant="body2" sx={{ mb: 2 }}>{text}</Typography>}
      {children}
    </CardContent>
  </MuiCard>
);

Card.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default Card;
