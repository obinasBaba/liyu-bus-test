import { createSlice } from '@reduxjs/toolkit';

export type BookingDetail = {
  createdAt: string;
  bookingUUIds: string[];
  payed?: boolean;
  paymentUUId?: string;
};

export type PaymentDetail = {
  createdAt: string;
  ticketUuids: string[];
  payed?: boolean;
  paymentUUId?: string;
};

type State = {
  bookingDetail: BookingDetail | null;
  paymentDetail: PaymentDetail | null;
  createdAt: string | null;
};

type Reducers = {
  setBookingDetail: (state: State, action: { payload: BookingDetail }) => void;
  setPaymentDetail: (state: State, action: { payload: PaymentDetail }) => void;
};

export const searchSlice = createSlice<State, Reducers>({
  name: 'booking',
  initialState: {
    bookingDetail: null,
    paymentDetail: null,
    createdAt: null,
  },
  reducers: {
    setBookingDetail: (state, action) => {
      // console.log('setBooking Detial: ', action);

      state.bookingDetail = action.payload;
      state.paymentDetail = null;
    },

    setPaymentDetail: (state, action) => {
      // console.log('setBooking Detial: ', action);

      state.paymentDetail = action.payload;
    },
  },
});

export const { setBookingDetail, setPaymentDetail } = searchSlice.actions;

export default searchSlice.reducer;
