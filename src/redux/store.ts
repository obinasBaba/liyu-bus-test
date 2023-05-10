import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './booking';
import locationReducer from './location';
import searchReducer from './search';
import scheduleReducer from './scheldule';
import busReducer from './bus';
import tripReducer from './trip';
import serviceProviderReducer from './serviceProvider';
import { load, save } from 'redux-localstorage-simple';
import moment from 'moment';

const store = configureStore({
  reducer: {
    booking: bookingReducer,
    location: locationReducer,
    search: searchReducer,
    schedule: scheduleReducer,
    bus: busReducer,
    trip: tripReducer,
    serviceProvider: serviceProviderReducer,
  },
  preloadedState: (function () {
    // note: bad, using any
    const loadedData: any = load({
      states: ['booking', 'search'],
    });

    console.log('loaded data : --------  ', loadedData);

    if (loadedData?.booking?.bookingDetail?.createdAt) {
      const createdAt = moment(loadedData?.booking?.bookingDetail?.createdAt);

      /* console.log(
         'mommm ',
         createdAt.toDate(),
         moment().toDate(),
         createdAt.isBefore(1, 'hour'),
       );

       console.log('is before : ', moment().diff(createdAt, 'hour'));*/

      if (moment().diff(createdAt, 'hour') > 1) {
        // if (createdAt.isBefore(3, 'minutes')) {
        console.log('expired booking data ----');
        // clear();
        delete loadedData.booking;
      }
    }

    if (loadedData?.search?.tripInfo?.createdAt) {
      const createdAt = moment(loadedData?.search?.tripInfo?.createdAt);

      if (moment().diff(createdAt, 'hour') > 1) {
        // if (createdAt.isBefore(3, 'minutes')) {
        console.log('expired tripinfo ----');
        // clear();
        delete loadedData?.search;
      }
    }

    return loadedData;
  })(),
  devTools: true,
  middleware: [
    save({
      states: ['booking', 'search'], // namespace: 'liyu',
    }),
  ],
});

export type StoreType = ReturnType<typeof store.getState>;

export default store;
