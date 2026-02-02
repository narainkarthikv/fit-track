import { updateTotalDays } from '../slices/userRoutineSlice';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Whatshot as FireIcon, CheckCircle as CheckCircleIcon, SentimentDissatisfied } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

const UserRoutine = ({ userID }) => {
  const [dayCheck, setDayCheck] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [streak, setStreak] = useState(0);
  const [weeklyStreakValue, setWeeklyStreakValue] = useState(0);
  const [msg, setMsg] = useState('');
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const dispatch = useDispatch();
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const weeklyStreak = (updatedDayCheck) => {
    const todayIndex = new Date().getDay();
    for (let index = 0; index < updatedDayCheck.length; index++) {
      if (!updatedDayCheck[index]) {
        setWeeklyStreakValue(index - 1);
        if (index < todayIndex) setMsg('Streak Missed Mid-week 😢');
        else setMsg('');
        return;
      }
    }
    setWeeklyStreakValue(todayIndex);
  };

  useEffect(() => {
    if (!userID) return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${backendURL}/api/user/streak/${userID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setStreak(data.streakCount);
        setDayCheck(data.dayCheck);
        weeklyStreak(data.dayCheck);
        dispatch(updateTotalDays(userID, data.dayCheck));
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [userID, backendURL, dispatch]);

  const today = new Date().getDay();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      gap: 2.5,
    }}>
      {/* Streak Card */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #FFC837 0%, #FF8008 100%)',
        borderRadius: '16px',
        p: 3,
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(255, 200, 55, 0.25)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
        }
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 1,
          mb: 0.5,
          position: 'relative',
        }}>
          <FireIcon sx={{ 
            fontSize: 36, 
            color: '#dc3545',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
          }} />
          <Typography sx={{ 
            fontSize: '3rem',
            fontWeight: 900,
            color: '#1a1a1a',
            lineHeight: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}>
            {streak}
          </Typography>
        </Box>
        <Typography sx={{ 
          fontSize: '1rem',
          fontWeight: 700,
          color: '#1a1a1a',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}>
          day streak!
        </Typography>
      </Box>

      {/* Weekdays Section */}
      <Box>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            mb: 1.5,
          }}
        >
          This Week
        </Typography>
        
        {/* Weekday Labels */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          mb: 2,
        }}>
          {weekdays.map((day, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                width: '38px',
              }}
            >
              <Typography sx={{
                fontSize: '0.85rem',
                fontWeight: index === today ? 700 : 500,
                color: index === today ? 'primary.main' : 'text.secondary',
                transition: 'all 0.2s ease',
              }}>
                {day}
              </Typography>
              {dayCheck[index] ? (
                <CheckCircleIcon sx={{ 
                  color: '#FFC837', 
                  fontSize: 20,
                  filter: 'drop-shadow(0 2px 4px rgba(255, 200, 55, 0.4))',
                }} />
              ) : (
                <Box sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }} />
              )}
            </Box>
          ))}
        </Box>

        {/* Progress Bar */}
        <Box sx={{ 
          height: '6px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '3px',
          overflow: 'hidden',
          mb: 2,
        }}>
          <Box
            sx={{
              height: '100%',
              width: `${(weeklyStreakValue / 6) * 100}%`,
              background: 'linear-gradient(90deg, #FFC837 0%, #FF8008 100%)',
              transition: 'width 0.5s ease-in-out',
              borderRadius: '3px',
            }}
          />
        </Box>

        {/* Status Message */}
        {msg && (
          <Chip
            icon={<SentimentDissatisfied sx={{ fontSize: 16 }} />}
            label={msg}
            size="small"
            sx={{
              backgroundColor: 'rgba(255, 193, 7, 0.15)',
              color: '#FFC837',
              border: '1px solid rgba(255, 193, 7, 0.3)',
              fontWeight: 600,
              fontSize: '0.8rem',
              width: '100%',
              height: 'auto',
              py: 0.5,
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

UserRoutine.propTypes = {
  userID: PropTypes.string.isRequired,
};

export default UserRoutine;
