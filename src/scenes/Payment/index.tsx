import React, { useEffect, useState } from 'react';
import { Alert, LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import Countdown from 'react-countdown';
import moment, { Moment } from 'moment/moment';
import {
  AlertTitle,
  Button,
  Card,
  Checkbox,
  Chip,
  FormControlLabel,
  Stack,
} from '@mui/material';
import clsx from 'clsx';
import { BookmarkAdd } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../redux/store';
import Ticket from './Ticket';
import { setPaymentDetail } from '../../redux/booking';
import API from '../../lib/API';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSchedules } from '../../actions/schedules';
import { Link } from 'react-router-dom';
import s from './ticketpayment.module.scss';

const imgData = [
  'img/telebirr.jpg',
  'img/awash.jpg',
  'img/amole.jpg',
  '/img/cbe.jpg',
];

/*
* {
  "id": 0,
  "uuid": "string",
  "version": 0,
  "dmlFlag": 0,
  "createdAt": "2023-04-12T12:41:23.800Z",
  "createdBy": "string",
  "updatedAt": "2023-04-12T12:41:23.800Z",
  "updatedBy": "string",
  "scheduleId": 0,
  "totalNumberOfSeats": 0,
  "bookingDate": "2023-04-12",
  "bookingStatus": "RESERVED",
  "bookingType": "string",
  "departureDate": "2023-04-12T12:41:23.800Z",
  "returnDate": "2023-04-12T12:41:23.800Z",
  "totalPrice": 0,
  "transactionNumber": "string",
  "seatNumber": "string",
  "status": "string",
  "active": true,
  "passengerId": 0,
  "firstName": "string",
  "lastName": "string",
  "middleName": "string",
  "phoneNumber": "string",
  "personUuid": "string",
  "mainPassenger": true,
  "roundTrip": true
}
* */

/*
* {
  "bookingUuids": [
    "string"
  ],
  "paymentMethod": "telebirr"
}
* */

/*
* {
  "status": 0,
  "message": "string",
  "errorCode": "string",
  "ticketUuids": [
    "string"
  ]
}
*
* */

type PaymentDetail = {
  bookingUuids: string[];
  paymentMethod: string;
};

export const mutationFn = (args: PaymentDetail) => {
  return API.post(
    '/payment/pay',
    {
      ...args,
    },
    {},
  )
    .then(res => {
      console.log('payment res --> ', res);
      return res;
    })
    .catch(err => {
      console.log('error payment: ', err);
      throw err;
    });
};

const PaymentPage = () => {
  const schedule = useSchedules();
  const dispatch = useDispatch();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [countDown, setCountDown] = useState<Moment | undefined>();
  const bookingDetail = useSelector(
    (state: StoreType) => state.booking.bookingDetail,
  );

  console.log('booing detail: ', bookingDetail);

  const paymentDetail = useSelector(
    (state: StoreType) => state.booking.paymentDetail,
  );
  const [showTicket, setShowTicket] = useState(paymentDetail?.payed);

  // const bookedData = useBookedData();

  const payment = useMutation({
    mutationFn,
    onSuccess(paymentResponse) {
      console.log('payment-data: ', paymentResponse);

      dispatch(
        setPaymentDetail({
          payed: true,
          ticketUuids: paymentResponse.data.ticketUuids,
          createdAt: moment().toDate().toString(),
        }),
      );

      toast.success('Payment successful, Proceed to your ticket');
      schedule.refetch();
      setShowTicket(true);
    },
    onError(err) {
      console.log('err: ', err);
      toast.error('Something went wrong,try again later');
    },
  });

  useEffect(() => {
    if (bookingDetail && bookingDetail.createdAt) {
      setCountDown(moment(new Date(bookingDetail.createdAt)));
    }
  }, [bookingDetail]);

  // console.log('bookingDetial ------ .', bookingDetail);

  const Completion = () => <span>You are good to go!</span>;

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completion />;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  if (!bookingDetail) {
    // return <Navigate to="/" />;
    return (
      <div className={s.container}>
        <div className={s.wrapper}>
          <Alert severity="warning" className={s.alert}>
            <AlertTitle>
              <Typography variant="h6">No Ticket</Typography>
            </AlertTitle>
            <Typography>
              You have not booked any seat yet!{' '}
              <Link to="/">
                <Button> BookNow</Button>
              </Link>
            </Typography>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        {showTicket ? (
          <>
            <Ticket />
          </>
        ) : (
          <>
            {bookingDetail && (
              <div className={s.booking_detail}>
                <Alert severity="success" className={s.alert}>
                  <Typography>
                    Your bus booking was successful. Kindly make your payment
                    within 1 hour from now, otherwise your bus booking will be
                    cancelled.
                  </Typography>
                </Alert>

                <Stack spacing={3} sx={{ mt: '4rem' }}>
                  <Typography variant="h5">Price Detail</Typography>

                  {countDown && (
                    <Card className={s.card}>
                      <Stack spacing={2}>
                        <Typography>
                          Remaining Time for booking expiration
                        </Typography>

                        <Chip
                          color="primary"
                          variant="outlined"
                          className={s.counter}
                          label={
                            <div>
                              <Countdown
                                date={countDown.add(1, 'hour').toDate()}
                                autoStart
                                renderer={renderer}
                              />
                            </div>
                          }
                        />
                      </Stack>
                    </Card>
                  )}

                  <Stack spacing={2} component={Card} className={s.card}>
                    <Typography>Total Tariff</Typography>

                    <Typography variant="h6"> 4000 ETB</Typography>
                  </Stack>
                </Stack>

                <div className={s.payment_card}>
                  <Typography variant="h6" color="gray">
                    Choose Payment Methods
                  </Typography>

                  <div className={s.methods}>
                    {imgData.map((img, index) => (
                      <Stack
                        key={img}
                        direction="row"
                        spacing={2}
                        component={Card}
                        className={clsx([
                          s.method,
                          selectedPayment === img && s.checked,
                        ])}
                        onClick={() => {
                          if (selectedPayment === img) {
                            setSelectedPayment(null);
                          } else {
                            setSelectedPayment(img);
                          }
                        }}
                      >
                        <img
                          src={img}
                          alt="payment"
                          className={clsx([
                            s.img_icon,
                            selectedPayment === img && s.checked,
                          ])}
                        />
                        <div className={s.method_desc}>
                          <FormControlLabel
                            control={
                              <Checkbox checked={selectedPayment === img} />
                            }
                            labelPlacement="start"
                            label="Commercial Bank of Ethiopia"
                            sx={{ pointerEvents: 'none' }}
                          />
                        </div>
                      </Stack>
                    ))}
                  </div>

                  <Stack
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    mt={10}
                  >
                    <Typography color="gray">
                      By clicking on the button below, you agree for Liyu Bus{' '}
                      <br />
                      <Link to="/">
                        <b>Term And Condition And Privacy Policy</b>
                      </Link>
                    </Typography>

                    <LoadingButton
                      variant="contained"
                      size="large"
                      fullWidth
                      className={clsx([s.proceed_btn])}
                      type="submit"
                      disabled={!selectedPayment}
                      // loading={bookSeats.isLoading}
                      endIcon={<BookmarkAdd />}
                      loading={payment.isLoading}
                      onClick={() => {
                        payment.mutate({
                          // scheduleId: bookingDetail?.bookingUUIds,
                          bookingUuids: bookingDetail?.bookingUUIds || [],
                          paymentMethod: 'telebirr',
                        });
                      }}
                    >
                      <Typography>Pay</Typography>
                    </LoadingButton>
                  </Stack>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
