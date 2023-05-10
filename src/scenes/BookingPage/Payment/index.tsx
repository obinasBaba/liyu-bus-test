import React, { useState } from 'react';
import './payment.module.scss';

import s from './payment.module.scss';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/lab';
import { Button } from '@mui/material';
import clsx from 'clsx';
import Countdown from 'react-countdown';
import moment from 'moment';

const imgData = [
  'img/telebirr.jpg',
  'img/awash.jpg',
  'img/amole.jpg',
  '/img/cbe.jpg',
];

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const Completionist = () => <span>You are good to go!</span>;

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <div className={s.pay_container}>
      <Alert severity="success" className={s.alert}>
        <Typography>
          Your bus booking was successful. Kindly make your payment within 1
          hour from now, otherwise your bus booking will be cancelled.
        </Typography>
      </Alert>

      <div className={s.counter}>
        <Countdown
          date={moment().add(1, 'hour').toDate()}
          autoStart
          renderer={renderer}
        />
      </div>

      <div className={s.pay_wrapper}>
        {imgData.map((img, index) => (
          <Button
            size="large"
            // variant={selectedPayment === img ? 'outlined' : 'text'}
            key={img}
            onClick={() => {
              setSelectedPayment(img);
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
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Payment;
