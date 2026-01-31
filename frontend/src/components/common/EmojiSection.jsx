import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const EmojiSection = ({ emoji, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      textAlign: 'center',
      mt: 4,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    }}
  >
    <EmojiEmotionsIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
    <Typography
      variant="body1"
      sx={{
        fontWeight: 700,
        color: 'text.primary',
      }}
      aria-live="polite"
    >
      Feeling {emoji} today?
    </Typography>
  </Box>
);

EmojiSection.propTypes = {
  emoji: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default EmojiSection;
