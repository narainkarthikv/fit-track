import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Fade } from '@mui/material';
import {
  fetchExercises,
  addExercise,
  deleteExercise,
} from '../slices/exercisesSlice';
import ExerciseTable from './Exercise/ExerciseTable';
import ExerciseForm from './Exercise/ExerciseForm';

const ExercisesList = ({ userID }) => {
  const dispatch = useDispatch();
  const userExercises = useSelector((state) => state.exercises.userExercises);
  const status = useSelector((state) => state.exercises.status);
  
  const exercises = useMemo(
    () => userExercises?.[userID] || [],
    [userExercises, userID]
  );
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
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          fontWeight: 600,
          color: 'text.primary',
          fontSize: '1.1rem'
        }}
      >
        Today's Exercises
      </Typography>
      
      <Box sx={{ 
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
      }}>
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
      
      {!formVisible && (
        <Box sx={{ mt: 2 }}>
          <button
            className="btn btn-outline-primary"
            onClick={() => setFormVisible(true)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '0.95rem',
              fontWeight: 500,
              borderRadius: '8px',
              transition: 'all 0.2s ease',
            }}
          >
            + Add Exercise
          </button>
        </Box>
      )}
    </Box>
  );
};

export default ExercisesList;
