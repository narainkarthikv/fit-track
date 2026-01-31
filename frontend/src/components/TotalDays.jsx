import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, LinearProgress } from '@mui/material';
import { CalendarToday, TrendingUp } from '@mui/icons-material';

const TotalDays = ({ userDetails }) => {
  const totalDays = useSelector(
    (state) =>
      state.userRoutine.userRoutineData[userDetails._id]?.totalDays || 0
  );

  const yearProgress = Math.min((totalDays / 365) * 100, 100);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: 2,
      height: '100%',
      justifyContent: 'center',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CalendarToday sx={{ fontSize: 20, color: 'warning.main' }} />
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {userDetails.username}'s Year
        </Typography>
      </Box>
      
      <Box>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 800,
            fontSize: '2.5rem',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
            mb: 0.5,
          }}
        >
          {totalDays}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            fontSize: '0.85rem',
            fontWeight: 500,
          }}
        >
          Active Days
        </Typography>
      </Box>
      
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TrendingUp sx={{ fontSize: 14, color: 'warning.main' }} />
            <Typography 
              variant="caption" 
              sx={{ 
                fontSize: '0.75rem',
                color: 'text.secondary',
                fontWeight: 600,
              }}
            >
              Year Progress
            </Typography>
          </Box>
          <Typography 
            variant="caption" 
            sx={{ 
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'warning.main',
            }}
          >
            {yearProgress.toFixed(1)}%
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={yearProgress} 
          sx={{ 
            height: 6,
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 3,
              background: 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default TotalDays;
