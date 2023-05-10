import axios from 'axios';
import { BookObj } from '../scenes/BookingPage/types';
import API from '../lib/API';

export const mutationFn = (args: BookObj) => {
  return API.post(
    '/booking/create-reservation',
    {
      ...args,
    },
    {},
  )
    .then(res => {
      console.log('booking res --> ', res);
      return res;
    })
    .catch(err => {
      console.log('error booking: ', err);
      throw err;
    });
};

// note: deprecated ( not using ), delete this
export const requestBook = (dispatch, bookingDetails, navigate) => {
  const booking = {
    scheduleUUId: bookingDetails?.travelDetail?.mainTravel?.schedule?.uuid,
    bookingDetails: bookingDetails?.passengersDetails,
    roundTrip: true,
  };

  console.log(booking);

  navigate('/travelTicket');

  axios
    .post(
      'https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/booking/create-book',
      booking,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      },
    )
    .then(() => {
      navigate('/travelTicket');
    });
};

// note: deprecated ( not using ), delete this
export const requestBookForRoundTrip = (dispatch, bookingDetails, navigate) => {
  console.log(bookingDetails);
  const mainBooking = {
    scheduleUUId: bookingDetails?.travelDetail?.mainTravel?.schedule?.uuid,
    bookingDetails: bookingDetails?.passengersDetails[0],
    roundTrip: true,
  };

  const returnBooking = {
    scheduleUUId: bookingDetails?.travelDetail?.returnTravel?.schedule?.uuid,
    bookingDetails: bookingDetails?.passengersDetails[1],
    roundTrip: true,
  };

  axios
    .post(
      'https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/booking/create-book',
      mainBooking,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      },
    )
    .then(() => {
      axios
        .post(
          'https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/booking/create-book',
          returnBooking,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          },
        )
        .then(() => {
          navigate('/travelTicket');
        });
    });
};
