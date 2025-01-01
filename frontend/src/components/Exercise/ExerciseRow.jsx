import React from 'react';
import PropTypes from 'prop-types';
import Exercise from './Exercise';

const ExerciseRow = ({ exercises = [], handleDelete }) => {

    return (
        <>
            {exercises.length > 0 ? (
                exercises.map((exercise) => {
                    if (!exercise || !exercise._id) {
                        return null;
                    }
                    return (
                        <Exercise key={exercise._id} deleteExercise={handleDelete} exercise={exercise} />
                    );
                })
            ) : (
                <tr>
                    <td colSpan=3 className=text-center>No exercises available.</td>
                </tr>
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
