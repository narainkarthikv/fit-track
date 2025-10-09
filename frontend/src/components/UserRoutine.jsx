import { updateTotalDays } from '../slices/userRoutineSlice';
import React, { useEffect, useState } from 'react';
import { FaFire, FaCheckCircle } from 'react-icons/fa';
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
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

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
        const res = await fetch(`${backendURL}/api/user/streak/${userID}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
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
    <div className="d-flex flex-column" style={{ minHeight: '300px' }}>
      {/* Streak Card */}
      <div className="bg-warning rounded-4 p-4 mb-4 text-center">
        <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
          <FaFire size={32} className="text-danger" />
          <span className="display-4 fw-bold text-dark">{streak}</span>
        </div>
        <p className="mb-0 text-dark fs-5">day streak!</p>
      </div>

      {/* Weekdays Section */}
      <div className="d-flex flex-column mt-2">
        {/* Weekday Labels */}
        <div className="d-flex justify-content-between mb-3">
          {weekdays.map((day, index) => (
            <div
              key={index}
              className={`text-center position-relative ${
                index === today ? 'text-primary fw-bold' : 'text-light'
              }`}
              style={{ width: '40px' }}
            >
              {day}
              {dayCheck[index] && (
                <div className="position-absolute top-100 start-50 translate-middle">
                  <FaCheckCircle className="text-warning mt-2" size={16} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="progress bg-dark" style={{ height: '4px' }}>
            <div
              className="progress-bar bg-warning"
              role="progressbar"
              style={{
                width: `${(weeklyStreakValue / 6) * 100}%`,
                transition: 'width 0.5s ease-in-out',
              }}
              aria-valuenow={weeklyStreakValue}
              aria-valuemin="0"
              aria-valuemax="6"
            />
          </div>
        </div>

        {/* Status Message */}
        {msg && (
          <div
            className="mt-2 text-center p-2 rounded-3"
            style={{
              backgroundColor: 'rgba(255, 193, 7, 0.1)',
              border: '1px solid rgba(255, 193, 7, 0.2)',
            }}
          >
            <span className="text-warning">{msg}</span>
          </div>
        )}
      </div>
    </div>
  );
};

UserRoutine.propTypes = {
  userID: PropTypes.string.isRequired,
};

export default UserRoutine;
