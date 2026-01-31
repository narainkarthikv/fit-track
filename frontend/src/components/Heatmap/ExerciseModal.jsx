import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box } from '@mui/material';
import { Save as SaveIcon, Close as CloseIcon } from '@mui/icons-material';
import ExerciseForm from './ExerciseForm';

const ExerciseModal = ({
  showAddModal,
  handleClose,
  handleSubmitExercise,
  exerciseDate,
  setExerciseDate,
  newExerciseCount,
  setNewExerciseCount,
}) => {
  return (
    <Dialog 
      open={showAddModal} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ fontWeight: 700, color: 'primary.main' }}>Add Exercise</Box>
        <IconButton onClick={handleClose} size="small" aria-label="Close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ExerciseForm
          exerciseDate={exerciseDate}
          setExerciseDate={setExerciseDate}
          newExerciseCount={newExerciseCount}
          setNewExerciseCount={setNewExerciseCount}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{ borderRadius: 8, px: 3 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmitExercise}
          startIcon={<SaveIcon />}
          sx={{ borderRadius: 8, px: 3 }}
        >
          Save Exercise
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExerciseModal;
