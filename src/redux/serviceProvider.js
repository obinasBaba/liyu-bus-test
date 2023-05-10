import { createSlice } from '@reduxjs/toolkit';

export const serviceProviderSlice = createSlice({
  name: 'serviceProvider',
  initialState: {
    serviceProviders: [
      {
        image: '/img/bus1.jpg',
        name: 'Abay Bus',
      },
      {
        image: '/img/bus2.jpg',
        name: 'Abay Bus',
      },
      {
        image: '/img/bus3.jpg',
        name: 'Abay Bus',
      },
      {
        image: '/img/bus4.jpg',
        name: 'Abay Bus',
      },
      {
        image: '/img/bus5.jpg',
        name: 'Abay Bus',
      },
      {
        image: '/img/bus6.jpg',
        name: 'Abay Bus',
      },
      {
        image: '/img/bus7.jpg',
        name: 'Abay Bus',
      },
      {
        image: '/img/bus8.jpg',
        name: 'Abay Bus',
      },
      {
        image: '/img/bus9.jpg',
        name: 'Abay Bus',
      },
      {
        image: '/img/bus10.jpg',
        name: 'Abay Bus',
      },
      {
        image: '/img/bus11.jpg',
        name: 'Abay Bus',
      },
      {
        image: '/img/bus12.jpg',
        name: 'Abay Bus',
      },
    ],
  },
  reducers: {
    setServiceProviders: (state, action) => {
      state.serviceProviders = action.payload;
    },
    remoceServiceProviders: state => {
      state.serviceProviders = null;
    },
  },
});

export const { setServiceProviders, remoceServiceProviders } =
  serviceProviderSlice.actions;

export default serviceProviderSlice.reducer;
