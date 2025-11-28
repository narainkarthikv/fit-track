import React, { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './Heatmap/Heatmap.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthData, addExercise } from '../slices/heatMapSlice';
import HeatmapControls from './Heatmap/HeatmapControls';
import ExerciseModal from './Heatmap/ExerciseModal';
import DetailsModal from './Heatmap/DetailsModal';

const HeatMap = ({ userID }) => {
  const dispatch = useDispatch();
  const monthData = useSelector(
    (state) => state.heatMap.userMonthData?.[userID] || []
  );
  const status = useSelector((state) => state.heatMap.status);

  // Set the default month to the current month
  const [selectedMonth, setSelectedMonth] = useState(() =>
    new Date().toLocaleString('default', { month: 'long' })
  );
  const [selectedValue, setSelectedValue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExerciseCount, setNewExerciseCount] = useState(0);
  const [exerciseDate, setExerciseDate] = useState(
    new Date().toISOString().split('T')[0]
  );

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
      <p>Loading...</p>
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
    <div className="d-flex font-weight-bold flex-column justify-content-center align-items-center p-4 bg-light rounded-3 shadow-sm">
      <HeatmapControls
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        handleAddExercise={handleAddExercise}
        months={months}
      />

      <div
        className="heatmap-container position-relative my-4"
        style={{ width: '100%', maxWidth: '800px' }}
      >
        {status === 'loading' ? (
          <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : null}
        {renderCalendarHeatmap()}
      </div>

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
    </div>
  );
};

export default HeatMap;
