import React, { useState } from 'react';
import ExerciseRow from './ExerciseRow';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const ExerciseTable = ({ exercises, handleDelete }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'description', direction: 'ascending' });

    const sortedExercises = sortExercises(exercises, sortConfig);

    const requestSort = (key) => {
        setSortConfig((prevConfig) => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending'
        }));
    };

    const getIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
        }
        return <FaSort />;
    };

    return (
        <table className="table table-striped table-dark">
            <TableHeader requestSort={requestSort} getIcon={getIcon} />
            <tbody className="text-center">
                <ExerciseRow exercises={sortedExercises} handleDelete={handleDelete} />
            </tbody>
        </table>
    );
};

const sortExercises = (exercises, sortConfig) => {
    return [...exercises].sort((a, b) => {
        const aValue = sortConfig.key === 'completed' ? Number(a[sortConfig.key]) : a[sortConfig.key];
        const bValue = sortConfig.key === 'completed' ? Number(b[sortConfig.key]) : b[sortConfig.key];

        if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });
};

const TableHeader = ({ requestSort, getIcon }) => {
    return (
        <thead className="text-center">
            <tr>
                <th onClick={() => requestSort('description')}>
                    Description {getIcon('description')}
                </th>
                <th onClick={() => requestSort('duration')}>
                    Duration (minutes) {getIcon('duration')}
                </th>
                <th onClick={() => requestSort('completed')}>
                    Completed {getIcon('completed')}
                </th>
                <th>Actions</th>
            </tr>
        </thead>
    );
};

export default ExerciseTable;
