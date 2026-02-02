import React from 'react';
import { TextField, Checkbox, FormControlLabel, Button, Box, Stack } from '@mui/material';
import { Add, Close } from '@mui/icons-material';

const ExerciseForm = ({
  newExerciseData,
  handleChange,
  handleAdd,
  setFormVisible,
}) => (
  <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
    <td colSpan={4} style={{ padding: '16px 12px' }}>
      <Box component="form" onSubmit={handleAdd} sx={{ width: '100%' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <TextField
            size="small"
            name="description"
            placeholder="Exercise name"
            value={newExerciseData.description}
            onChange={handleChange}
            required
            fullWidth
            sx={{ 
              minWidth: 150,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <TextField
            size="small"
            type="number"
            name="duration"
            placeholder="Minutes"
            value={newExerciseData.duration}
            onChange={handleChange}
            required
            inputProps={{ min: 1 }}
            fullWidth
            sx={{ 
              minWidth: 120,
              maxWidth: 150,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="exerciseCheck"
                checked={newExerciseData.exerciseCheck}
                onChange={handleChange}
                sx={{
                  color: 'rgba(255, 255, 255, 0.3)',
                  '&.Mui-checked': {
                    color: 'success.main',
                  },
                }}
              />
            }
            label="Done"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: '0.9rem',
              },
            }}
          />
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Close />}
              onClick={() => setFormVisible(false)}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: 'text.secondary',
                borderRadius: '8px',
                '&:hover': {
                  borderColor: 'error.main',
                  backgroundColor: 'rgba(239, 83, 80, 0.1)',
                  color: 'error.main',
                },
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              size="small"
              startIcon={<Add />}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '8px',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #63408b 100%)',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                },
              }}
            >
              Add
            </Button>
          </Stack>
        </Stack>
      </Box>
    </td>
  </tr>
);

export default ExerciseForm;
