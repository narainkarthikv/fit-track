import React from 'react';
import { Dialog, DialogContent, IconButton, Box, Typography, Stack, Chip } from '@mui/material';
import { CalendarMonth, FitnessCenter, EmojiEvents, Close } from '@mui/icons-material';

const DetailsModal = ({ showModal, handleClose, selectedValue }) => {
  const defaultValue = {
    date: 'No date selected',
    count: 0,
  };

  const getFeedbackInfo = (count) => {
    if (count > 8) return { color: 'success', text: 'Excellent!', icon: '🏆' };
    if (count > 5) return { color: 'info', text: 'Good', icon: '💪' };
    if (count > 0) return { color: 'warning', text: 'Keep Going', icon: '🎯' };
    return { color: 'default', text: 'No Exercise', icon: '💤' };
  };

  const feedback = getFeedbackInfo(
    selectedValue ? selectedValue.count : defaultValue.count
  );

  return (
    <Dialog open={showModal} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ p: 4, position: 'relative' }}>
        <IconButton
          onClick={handleClose}
          aria-label="Close"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <Close />
        </IconButton>

        <Stack spacing={3} alignItems="center" sx={{ textAlign: 'center', mt: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'primary.main' }}>
            <CalendarMonth />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {selectedValue ? selectedValue.date : defaultValue.date}
            </Typography>
          </Stack>

          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 3,
              p: 3,
              width: '100%',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
              <FitnessCenter color="primary" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Exercise Count
              </Typography>
            </Stack>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {selectedValue ? selectedValue.count : defaultValue.count}
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: `${feedback.color}.light`,
              borderRadius: 3,
              p: 3,
              width: '100%',
              opacity: 0.9,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
              <EmojiEvents color={feedback.color} fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Status
              </Typography>
            </Stack>
            <Stack spacing={1} alignItems="center">
              <Typography variant="h2">{feedback.icon}</Typography>
              <Chip
                label={feedback.text}
                color={feedback.color}
                sx={{ fontWeight: 700, fontSize: '1rem' }}
              />
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
