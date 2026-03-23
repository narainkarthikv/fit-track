import React from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

const HeatmapControls = ({
  selectedMonth,
  setSelectedMonth,
  handleAddExercise,
  months,
  compact = false,
}) => {
  const containerSx = compact
    ? {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 1.5,
      }
    : {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        gap: 2,
        bgcolor: 'background.paper',
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
      };

  return (
    <Box sx={containerSx}>
      <FormControl size="small" sx={{ minWidth: compact ? 130 : 150 }}>
        <InputLabel id="select-month-label">Month</InputLabel>
        <Select
          labelId="select-month-label"
          id="selectMonth"
          value={selectedMonth}
          label="Month"
          onChange={(e) => setSelectedMonth(e.target.value)}
          sx={{ fontWeight: 600 }}
        >
          {months.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        startIcon={<AddCircleOutline />}
        onClick={handleAddExercise}
        size={compact ? 'small' : 'medium'}
        sx={{ borderRadius: 8 }}
      >
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
          Add Exercise
        </Box>
        <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
          Add
        </Box>
      </Button>
    </Box>
  );
};

export default HeatmapControls;
