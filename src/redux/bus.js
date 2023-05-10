import { createSlice } from '@reduxjs/toolkit';

export const busSlice = createSlice({
  name: 'bus',
  initialState: {
    buses: [],
  },
  reducers: {
    setBuses: (state, action) => {
      state.buses = action.payload;
    },
    removeBuses: state => {
      state.buses = null;
    },
  },
});

export const { setBuses, removeBuses } = busSlice.actions;

export default busSlice.reducer;
