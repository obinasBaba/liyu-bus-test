import { createSlice } from '@reduxjs/toolkit';

export const tripSlice = createSlice({
  name: 'trip',
  initialState: {
    activeTrips: [
      { from: 'Addis Ababa', to: 'Gishen Mariam' },
      { from: 'Addis Ababa', to: 'Gishen Mariam' },
      { from: 'Addis Ababa', to: 'Gishen Mariam' },
      { from: 'Addis Ababa', to: 'Gishen Mariam' },
      { from: 'Addis Ababa', to: 'Gishen Mariam' },
      { from: 'Addis Ababa', to: 'Gishen Mariam' },
      { from: 'Addis Ababa', to: 'Gishen Mariam' },
      { from: 'Addis Ababa', to: 'Gishen Mariam' },
      { from: 'Addis Ababa', to: 'Gishen Mariam' },
      { from: 'Addis Ababa', to: 'Gishen Mariam' },
      { from: 'Addis Ababa', to: 'Gishen Mariam' },
      { from: 'Addis Ababa', to: 'Gishen Mariam' },
      { from: 'Addis Ababa', to: 'Gishen Mariam' },
      { from: 'Addis Ababa', to: 'Gishen Mariam' },
      { from: 'Addis Ababa', to: 'Gishen Mariam' },
    ],
  },
  reducers: {
    setActiveTrips: (state, action) => {
      state.activeTrips = action.payload;
    },
    removeTrips: state => {
      state.activeTrips = null;
    },
  },
});

export const { setActiveTrips, removeTrips } = tripSlice.actions;

export default tripSlice.reducer;
