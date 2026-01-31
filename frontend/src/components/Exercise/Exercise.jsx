import { IconButton, Chip, Tooltip, Box } from '@mui/material';
import { CheckCircle, Cancel, Delete } from '@mui/icons-material';

const Exercise = ({ deleteExercise, exercise }) => {
  return (
    <tr 
      style={{ 
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <td style={{ 
        padding: '16px 12px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '0.95rem',
        fontWeight: 500,
      }}>
        {exercise.description}
      </td>
      <td style={{ 
        padding: '16px 12px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.9rem',
      }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
          {exercise.duration}
          <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>min</span>
        </Box>
      </td>
      <td style={{ padding: '16px 12px' }}>
        {exercise.exerciseCheck ? (
          <Chip 
            icon={<CheckCircle sx={{ fontSize: 16 }} />}
            label="Done"
            size="small"
            sx={{ 
              backgroundColor: 'rgba(46, 125, 50, 0.15)',
              color: '#66bb6a',
              border: '1px solid rgba(102, 187, 106, 0.3)',
              fontWeight: 600,
              fontSize: '0.75rem',
              height: '24px',
            }}
          />
        ) : (
          <Chip 
            icon={<Cancel sx={{ fontSize: 16 }} />}
            label="Pending"
            size="small"
            sx={{ 
              backgroundColor: 'rgba(211, 47, 47, 0.1)',
              color: '#ef5350',
              border: '1px solid rgba(239, 83, 80, 0.3)',
              fontWeight: 600,
              fontSize: '0.75rem',
              height: '24px',
            }}
          />
        )}
      </td>
      <td style={{ padding: '16px 12px' }}>
        <Tooltip title="Delete exercise" arrow>
          <IconButton
            size="small"
            onClick={() => deleteExercise(exercise._id)}
            sx={{ 
              color: 'rgba(255, 255, 255, 0.5)',
              '&:hover': { 
                backgroundColor: 'rgba(239, 83, 80, 0.15)',
                color: '#ef5350',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <Delete sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
};

export default Exercise;
