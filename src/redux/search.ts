import { createSlice } from '@reduxjs/toolkit';

export type TripInfo = {
  from: { label: string; id: string };
  to: { label: string; id: string };
  bus?: { label: string; id: string };
  twoWayTrip: boolean;
  invoker?: string;
  departureDate: string | Date;
  returnDate?: string | Date;
  createdAt?: string | null;
};

type ScheduleSearchReqBody = {
  departureLocationUUId: string;
  destinationLocationUUId: string;
  departureDate: string;
  returnDate?: string;
  busCompanyUUId: string;
};

type State = {
  request: Record<string, any> | null;
  tripInfo: TripInfo | null;
  scheduleSearchReqBody: ScheduleSearchReqBody | null;
};

type Reducers = {
  setRequest: (state: State, action: { payload: Record<string, any> }) => void;
  setTripInfo: (state: State, action: { payload: TripInfo }) => void;
  setRequestBody: (
    state: State,
    action: { payload: ScheduleSearchReqBody },
  ) => void;
  removeTripInfo: (state: State) => void;
};

export const searchSlice = createSlice<State, Reducers>({
  name: 'search',
  initialState: {
    request: null,
    scheduleSearchReqBody: null,
    tripInfo: null,

    /*tripInfo: {
      from: {
        label: 'Addis Ababa',
        id: 'aa8e3b39-cf91-4d8b-85b3-96bfadd9da54',
      },
      to: {
        label: 'Bahir Dar',
        id: 'e1d30b6c-617f-44f5-bcf7-5e1d070f1e70',
      },
      twoWayTrip: true,
      departureDate: '2023-04-24',
      returnDate: '2023-04-25',
      bus: {
        label: '',
        id: '',
      },
      invoker: 'hero',
      createdAt: 'Mon Apr 24 2023 04:15:49 GMT+0300 (East Africa Time)',
    },*/
  },
  extraReducers: {},
  reducers: {
    setRequest: (state, action) => {
      state.request = action.payload;
    },
    removeTripInfo: state => {
      state.request = null;
    },

    setTripInfo: (state, action) => {
      state.tripInfo = action.payload;
    },

    setRequestBody: (state, action) => {
      state.scheduleSearchReqBody = action.payload;
    },
  },
});

export const { setRequest, setRequestBody, setTripInfo } = searchSlice.actions;

export default searchSlice.reducer;
