import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = import.meta.env.VITE_API_URL;

const initialState = {
  userRoutineData: {},
  status: 'idle',
  error: null,
};

const userRoutineSlice = createSlice({
  name: 'userRoutine',
  initialState,
  reducers: {
    setDayCheck: (state, action) => {
      const { userID, dayCheck } = action.payload;
      if (!state.userRoutineData[userID]) {
        state.userRoutineData[userID] = {};
      }
      state.userRoutineData[userID].dayCheck = dayCheck;
    },
    updateTotalDaysSuccess: (state, action) => {
      const { userID, totalDays } = action.payload;
      if (!state.userRoutineData[userID]) {
        state.userRoutineData[userID] = {};
      }
      state.userRoutineData[userID].totalDays = totalDays;
      state.status = 'succeeded';
    },
    updateTotalDaysFailure: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {
  setDayCheck,
  updateTotalDaysSuccess,
  updateTotalDaysFailure,
  setStatus,
} = userRoutineSlice.actions;

export const updateTotalDays =
  (userID, updatedDayCheck) => async (dispatch) => {
    dispatch(setStatus('loading'));
    try {
      const url = `${backendURL}/api/user/${userID}/updateTotalDays`;
      console.log(url); // Verify URL

      // Make the API call
      const response = await axios.post(url, { dayCheck: updatedDayCheck });

      // Extract updated totalDays from the response
      const { totalDays } = response.data;

      dispatch(setDayCheck({ userID, dayCheck: updatedDayCheck }));
      dispatch(updateTotalDaysSuccess({ userID, totalDays }));
    } catch (error) {
      console.error('Error in updateTotalDays:', error);
      dispatch(updateTotalDaysFailure(error.toString()));
    }
  };

export default userRoutineSlice.reducer;
