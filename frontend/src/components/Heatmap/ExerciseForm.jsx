import React from 'react';
import { TextField, Box, Stack, Typography, InputAdornment } from '@mui/material';
import { CalendarMonth, FitnessCenter } from '@mui/icons-material';

const ExerciseForm = ({
  exerciseDate,
  setExerciseDate,
  newExerciseCount,
  setNewExerciseCount,
}) => {
  return (
    <Box component="form" sx={{ py: 2 }}>
      <Stack spacing={3}>
        <Box>
          <Typography
            variant="body2"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}
          >
            <CalendarMonth fontSize="small" />
            Exercise Date
          </Typography>
          <TextField
            type="date"
            value={exerciseDate}
            onChange={(e) => setExerciseDate(e.target.value)}
            fullWidth
            size="large"
            sx={{
              '& .MuiInputBase-root': {
                bgcolor: 'background.paper',
              },
            }}
          />
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}
          >
            <FitnessCenter fontSize="small" />
            Number of Exercises
          </Typography>
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            value={newExerciseCount}
            onChange={(e) => setNewExerciseCount(Number(e.target.value) || 0)}
            fullWidth
            size="large"
            placeholder="Enter exercise count"
            sx={{
              '& .MuiInputBase-root': {
                bgcolor: 'background.paper',
              },
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default ExerciseForm;
