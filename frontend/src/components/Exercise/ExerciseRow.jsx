import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, TableRow, TableCell } from '@mui/material';
import { FitnessCenter } from '@mui/icons-material';
import Exercise from './Exercise';

const ExerciseRow = ({ exercises = [], handleDelete }) => {
  return (
    <>
      {exercises.length > 0 ? (
        exercises.map((exercise) => {
          if (!exercise || !exercise._id) {
            return null;
          }
          return <Exercise key={exercise._id} deleteExercise={handleDelete} exercise={exercise} />;
        })
      ) : (
        <TableRow>
          <TableCell colSpan={4} sx={{ py: 5 }}>
            <Box
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                opacity: 0.6,
              }}
            >
              <FitnessCenter sx={{ fontSize: 48, color: 'primary.main', opacity: 0.5 }} />
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              >
                No exercises yet. Add your first workout!
              </Typography>
            </Box>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

// Adding PropTypes for type checking
ExerciseRow.propTypes = {
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      exerciseCheck: PropTypes.bool.isRequired,
    })
  ),
  handleDelete: PropTypes.func.isRequired,
};

export default ExerciseRow;
