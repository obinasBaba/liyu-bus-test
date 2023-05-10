import { createSlice } from '@reduxjs/toolkit';
import { oneWayDummy, twoWayDummy } from '../scenes/HomePage/Hero/util/dummy';

export const schedulesSlice = createSlice({
  name: 'schedules',
  initialState: {
    schedules: {
      schedules: oneWayDummy,
      oneWay: oneWayDummy,
      twoWayScheduleResponse: twoWayDummy,
      twoWay: twoWayDummy,
    },
  },
  reducers: {
    setSchedules: (state, action) => {
      state.schedules = action.payload;
    },
    removeSchedules: state => {
      state.schedules = null;
    },
  },
});

export const { setSchedules, removeSchedules } = schedulesSlice.actions;

export default schedulesSlice.reducer;
