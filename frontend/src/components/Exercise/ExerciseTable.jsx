import React from 'react';
import ExerciseRow from './ExerciseRow';

const ExerciseTable = ({ exercises, handleDelete }) => (
    <table className="table table-striped table-dark">
        <thead className="text-center">
            <tr>
                <th>Description</th>
                <th>Duration (minutes)</th>
                <th>Completed</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody className="text-center">
            <ExerciseRow exercises={exercises} handleDelete={handleDelete} />
        </tbody>
    </table>
);

export default ExerciseTable;
