import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Fade, Button } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { fetchExercises, addExercise, deleteExercise } from '../slices/exercisesSlice';
import ExerciseTable from './Exercise/ExerciseTable';
import ExerciseForm from './Exercise/ExerciseForm';

const ExercisesList = ({ userID, title = "Today's Exercises" }) => {
  const dispatch = useDispatch();
  const userExercises = useSelector((state) => state.exercises.userExercises);
  const status = useSelector((state) => state.exercises.status);

  const exercises = useMemo(() => userExercises?.[userID] || [], [userExercises, userID]);
  const [formVisible, setFormVisible] = useState(false);
  const [newExerciseData, setNewExerciseData] = useState({
    description: '',
    duration: 0,
    exerciseCheck: false,
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchExercises(userID));
    }
  }, [userID, status, dispatch]);

  useEffect(() => {
    // Fetch exercises whenever the userID changes to ensure the correct data is shown
    dispatch(fetchExercises(userID));
  }, [userID, dispatch]);

  const handleDelete = (exerciseId) => {
    dispatch(deleteExercise(userID, exerciseId));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addExercise(userID, newExerciseData)).then(() => {
      // Optionally fetch exercises again to ensure the state is updated
      dispatch(fetchExercises(userID));
    });
    setFormVisible(false);
    setNewExerciseData({ description: '', duration: 0, exerciseCheck: false });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewExerciseData({
      ...newExerciseData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 2,
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.125rem' }}>
          {title}
        </Typography>
        <Button
          variant={formVisible ? 'outlined' : 'contained'}
          startIcon={formVisible ? <Close /> : <Add />}
          onClick={() => setFormVisible((prev) => !prev)}
          sx={{ borderRadius: 8, fontWeight: 600 }}
        >
          {formVisible ? 'Close' : 'Add Exercise'}
        </Button>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          minHeight: '380px',
          maxHeight: '380px',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.15)',
            },
          },
        }}
      >
        {status === 'loading' && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">Loading exercises...</Typography>
          </Box>
        )}
        {status === 'failed' && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="error.main">Error fetching exercises.</Typography>
          </Box>
        )}
        <Fade in={status === 'succeeded'} timeout={500}>
          <Box>
            <ExerciseTable
              exercises={exercises}
              handleDelete={handleDelete}
              formVisible={formVisible}
              formComponent={
                <ExerciseForm
                  newExerciseData={newExerciseData}
                  handleChange={handleChange}
                  handleAdd={handleAdd}
                  setFormVisible={setFormVisible}
                />
              }
            />
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default ExercisesList;
