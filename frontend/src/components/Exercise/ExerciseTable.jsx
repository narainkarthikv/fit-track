import React, { useState } from 'react';
import { Box, Table, TableContainer, Paper } from '@mui/material';
import ExerciseRow from './ExerciseRow';
import { UnfoldMore as SortIcon, ArrowUpward as SortUpIcon, ArrowDownward as SortDownIcon } from '@mui/icons-material';

const ExerciseTable = ({ exercises = [], handleDelete, formVisible, formComponent }) => {
  const [sortConfig, setSortConfig] = useState({
    key: 'description',
    direction: 'ascending',
  });

  const sortedExercises = Array.isArray(exercises)
    ? sortExercises(exercises, sortConfig)
    : [];

  const requestSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === 'ascending'
          ? 'descending'
          : 'ascending',
    }));
  };

  const getIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? (
        <SortUpIcon sx={{ fontSize: 16, ml: 0.5 }} />
      ) : (
        <SortDownIcon sx={{ fontSize: 16, ml: 0.5 }} />
      );
    }
    return <SortIcon sx={{ fontSize: 16, ml: 0.5 }} />;
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
        <TableHeader requestSort={requestSort} getIcon={getIcon} />
        <tbody style={{ textAlign: 'center' }}>
          <ExerciseRow exercises={sortedExercises} handleDelete={handleDelete} />
          {formVisible && formComponent}
        </tbody>
      </Table>
    </TableContainer>
  );
};

const sortExercises = (exercises, sortConfig) => {
  return [...exercises].sort((a, b) => {
    const aValue =
      sortConfig.key === 'completed'
        ? Number(a[sortConfig.key])
        : a[sortConfig.key];
    const bValue =
      sortConfig.key === 'completed'
        ? Number(b[sortConfig.key])
        : b[sortConfig.key];

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
    <thead>
      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <th 
          onClick={() => requestSort('description')}
          style={{ 
            cursor: 'pointer',
            padding: '16px 12px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.7)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            userSelect: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.9)'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
            Description {getIcon('description')}
          </Box>
        </th>
        <th 
          onClick={() => requestSort('duration')}
          style={{ 
            cursor: 'pointer',
            padding: '16px 12px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.7)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            userSelect: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.9)'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
            Duration {getIcon('duration')}
          </Box>
        </th>
        <th 
          onClick={() => requestSort('completed')}
          style={{ 
            cursor: 'pointer',
            padding: '16px 12px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.7)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            userSelect: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.9)'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
            Status {getIcon('completed')}
          </Box>
        </th>
        <th
          style={{ 
            padding: '16px 12px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.7)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default ExerciseTable;
