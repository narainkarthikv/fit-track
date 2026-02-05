import React, { useState } from 'react';
import {
  Box,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
} from '@mui/material';
import ExerciseRow from './ExerciseRow';

const ExerciseTable = ({ exercises = [], handleDelete, formVisible, formComponent }) => {
  const [sortConfig, setSortConfig] = useState({
    key: 'description',
    direction: 'ascending',
  });

  const sortedExercises = Array.isArray(exercises) ? sortExercises(exercises, sortConfig) : [];

  const requestSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending',
    }));
  };

  const getSortDirection = (key) => (sortConfig.key === key ? sortConfig.direction : false);

  const headerCellSx = {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: 'text.secondary',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    borderBottom: '1px solid',
    borderColor: 'rgba(255, 255, 255, 0.08)',
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        border: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <Table size="small" sx={{ minWidth: 450 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={headerCellSx} align="left">
              <TableSortLabel
                active={sortConfig.key === 'description'}
                direction={getSortDirection('description') || 'asc'}
                onClick={() => requestSort('description')}
              >
                Description
              </TableSortLabel>
            </TableCell>
            <TableCell sx={headerCellSx} align="left">
              <TableSortLabel
                active={sortConfig.key === 'duration'}
                direction={getSortDirection('duration') || 'asc'}
                onClick={() => requestSort('duration')}
              >
                Duration
              </TableSortLabel>
            </TableCell>
            <TableCell sx={headerCellSx} align="left">
              <TableSortLabel
                active={sortConfig.key === 'completed'}
                direction={getSortDirection('completed') || 'asc'}
                onClick={() => requestSort('completed')}
              >
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell sx={headerCellSx} align="left">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <ExerciseRow exercises={sortedExercises} handleDelete={handleDelete} />
          {formVisible && formComponent}
        </TableBody>
      </Table>
    </TableContainer>
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

export default ExerciseTable;
