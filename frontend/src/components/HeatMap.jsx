import React, { useState, useEffect, useMemo } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Box, Paper, Stack, Typography, CircularProgress, alpha, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthData, addExercise } from '../slices/heatMapSlice';
import HeatmapControls from './Heatmap/HeatmapControls';
import ExerciseModal from './Heatmap/ExerciseModal';
import DetailsModal from './Heatmap/DetailsModal';

const HeatMap = ({ userID }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const userMonthData = useSelector((state) => state.heatMap.userMonthData);
  const status = useSelector((state) => state.heatMap.status);

  const monthData = useMemo(() => userMonthData?.[userID] || [], [userMonthData, userID]);

  // Set the default month to the current month
  const [selectedMonth, setSelectedMonth] = useState(() =>
    new Date().toLocaleString('default', { month: 'long' })
  );
  const [selectedValue, setSelectedValue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExerciseCount, setNewExerciseCount] = useState(0);
  const [exerciseDate, setExerciseDate] = useState(new Date().toISOString().split('T')[0]);

  const months = Array.from({ length: 12 }, (_, index) =>
    new Date(0, index).toLocaleString('default', { month: 'long' })
  );

  useEffect(() => {
    if (userID) {
      dispatch(fetchMonthData(userID, selectedMonth));
    }
  }, [dispatch, userID, selectedMonth]);

  const handleClick = (value) => {
    setSelectedValue(value);
    setShowModal(true);
  };

  const handleAddExercise = () => {
    setExerciseDate(new Date().toISOString().split('T')[0]);
    setNewExerciseCount(0);
    setShowAddModal(true);
  };

  const handleSubmitExercise = () => {
    if (exerciseDate && newExerciseCount > 0) {
      const newExerciseData = {
        date: new Date(exerciseDate).toISOString(),
        count: Number(newExerciseCount),
      };

      dispatch(addExercise(userID, newExerciseData)).then(() => {
        resetAddExerciseForm();
      });
    }
  };

  const resetAddExerciseForm = () => {
    setShowAddModal(false);
    setExerciseDate(new Date().toISOString().split('T')[0]);
    setNewExerciseCount(0);
  };

  const renderCalendarHeatmap = () => {
    const year = new Date().getFullYear();
    const monthIndex = months.indexOf(selectedMonth);
    const startDate = new Date(year, monthIndex, 0);
    const endDate = new Date(year, monthIndex + 1, 0);

    const transformedData = Array.isArray(monthData)
      ? monthData.map((item) => ({
          date: new Date(item.date).toISOString().split('T')[0],
          count: item.count,
        }))
      : [];

    return status === 'loading' ? (
      <Typography variant="body2" color="text.secondary">
        Loading...
      </Typography>
    ) : (
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={transformedData}
        classForValue={(value) => {
          if (!value || value.count === 0) return 'color-empty';
          if (value.count < 4) return 'color-scale-1';
          if (value.count < 8) return 'color-scale-2';
          return 'color-scale-3';
        }}
        onClick={handleClick}
        horizontal={false}
        gutterSize={5}
      />
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 3,
        border: '1px solid',
        borderColor: alpha(theme.palette.primary.main, 0.12),
        backgroundImage:
          'linear-gradient(135deg, rgba(39, 198, 184, 0.08) 0%, rgba(18, 27, 38, 0.2) 45%, rgba(255, 181, 71, 0.08) 100%)',
      }}
    >
      <Stack spacing={2.5} alignItems="stretch">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.125rem' }}>
            Activity Heatmap
          </Typography>
          <Box sx={{ ml: { sm: 'auto' }, width: { xs: '100%', sm: 'auto' } }}>
            <HeatmapControls
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              handleAddExercise={handleAddExercise}
              months={months}
              compact
            />
          </Box>
        </Box>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            borderRadius: 3,
            p: { xs: 1, md: 2 },
            backgroundColor: alpha(theme.palette.background.paper, 0.6),
            border: '1px solid',
            borderColor: 'divider',
            overflowX: 'auto',
          }}
        >
          {status === 'loading' && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: alpha(theme.palette.background.default, 0.6),
                zIndex: 1,
              }}
            >
              <CircularProgress size={36} />
            </Box>
          )}
          {renderCalendarHeatmap()}
        </Box>
      </Stack>

      <DetailsModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        selectedValue={selectedValue}
      />

      <ExerciseModal
        showAddModal={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleSubmitExercise={handleSubmitExercise}
        exerciseDate={exerciseDate}
        setExerciseDate={setExerciseDate}
        newExerciseCount={newExerciseCount}
        setNewExerciseCount={setNewExerciseCount}
      />
    </Paper>
  );
};

export default HeatMap;
