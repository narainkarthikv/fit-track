import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = import.meta.env.VITE_API_URL;

const initialState = {
  dayCheck: [false, false, false, false, false, false, false],
  totalDays: 0,
  status: 'idle',
  error: null,
};

const userRoutineSlice = createSlice({
  name: 'userRoutine',
  initialState,
  reducers: {
    setDayCheck: (state, action) => {
      state.dayCheck = action.payload;
    },
    updateTotalDaysSuccess: (state, action) => {
      state.totalDays = action.payload; 
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

export const { setDayCheck, updateTotalDaysSuccess, updateTotalDaysFailure, setStatus } = userRoutineSlice.actions;

export const updateTotalDays = (userID, updatedDayCheck) => async (dispatch, getState) => {
  dispatch(setStatus('loading'));
  try {
    const url = `${backendURL}/api/user/${userID}/updateTotalDays`;
    console.log(url); // Verify URL
   
    // Make the API call
   const response = await axios.post(url  ,{ dayCheck: updatedDayCheck  });
    
    // Extract updated totalDays from the response
    const { totalDays } = response.data;

    dispatch(setDayCheck(updatedDayCheck));
    dispatch(updateTotalDaysSuccess(totalDays));
  } catch (error) {
    console.error('Error in updateTotalDays:', error);
    dispatch(updateTotalDaysFailure(error.toString()));
  }
};

export default userRoutineSlice.reducer;
