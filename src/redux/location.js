import { createSlice } from '@reduxjs/toolkit';

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    locations: ['one', 'two'],
  },
  reducers: {
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
    removeLocations: state => {
      state.locations = null;
    },
  },
});

export const { setLocations, removeLocations } = locationSlice.actions;

export default locationSlice.reducer;
