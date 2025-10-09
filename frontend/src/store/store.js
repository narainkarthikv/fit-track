import { configureStore } from '@reduxjs/toolkit';
import exercisesReducer from '../slices/exercisesSlice';
import userRoutineReducer from '../slices/userRoutineSlice';
import heatMapReducer from '../slices/heatMapSlice';

const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    userRoutine: userRoutineReducer,
    heatMap: heatMapReducer,
  },
});

export default store;
