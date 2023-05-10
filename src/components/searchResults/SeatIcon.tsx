import './seat.module.scss';
import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { BookingStatus } from '../../scenes/BookingPage/ScheduleList/ScheduleCard/SeatSelection';

import s from './seat.module.scss';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

const Icon = (
  { color = 'black' }, // todo: 👉🏼 optimize this svg
) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 61 84"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M49.6 2.60006C46.2667 5.93339 48.1334 17.8001 52.1334 19.0001C55.6 20.2001 55.3333 21.9334 51.4667 22.8667C48.8 23.5334 47.7334 25.1334 46.1334 31.4001C44.9334 35.5334 42.1333 42.8667 39.8667 47.6667C35.2 57.5334 34.7333 63.8 39 63C40.4667 62.7333 43.8667 62.0667 46.1334 62.0667H50.2667L55.2 45.5334C60.1333 29.4001 60.1334 29.0001 57.8667 25.1334C55.6 21.4001 55.6 21.0001 57.7333 18.6001C64.1333 11.5334 56.2667 -4.06661 49.6 2.60006Z"
      fill={color}
    />
    <path
      d="M5.20002 59.5C0.266688 60.9667 -1.33331 67.3667 1.60002 73.7667L3.06669 77.1H24.5334L46 76.9667L42.4 74.3C40.4 72.8333 38.1334 69.6333 37.3334 67.1C36.5334 64.5667 35.0667 62.4333 34.2667 62.4333C33.3334 62.3 26.9334 61.6333 19.8667 60.7C12.8 59.7667 6.26669 59.2333 5.20002 59.5Z"
      fill={color}
    />
    <path
      d="M42 64.0667C40.6667 65.1334 39.8667 67.1334 40.2667 69.1334C40.5333 71.6667 41.4667 72.3334 44.6667 72.3334C48 72.3334 48.8 71.8001 49.0667 68.7334C49.6 64.2001 45.6 61.5334 42 64.0667Z"
      fill={color}
    />
    <path
      d="M5.73335 81.2667C6.40001 83.6667 44.2667 83.6667 45.0667 81.2667C45.4667 80.0667 40.9333 79.6667 25.3333 79.6667C9.73335 79.6667 5.20001 80.0667 5.73335 81.2667Z"
      fill={color}
    />
  </svg>
);

const SeatIcon = ({
  seatNumber,
  seatType: sType,
  seatSelectionType,
}: { seatType: BookingStatus } & Record<string, any>) => {
  const [seatType, setSeatType] = useState(sType);
  const [color, setColor] = useState('white');
  const formik = useFormikContext<any>();
  const { values, setFieldValue, handleChange } = formik;

  useEffect(() => {
    setSeatType(sType);
  }, [sType]);

  useEffect(() => {
    // console.log('seatType: ', sType);

    switch (seatType) {
      case 'AVAILABLE':
        setColor('white');
        break;
      case 'SELECTED':
        setColor('#e74f00');
        break;
      case 'RESERVED':
        setColor('#11263a');
        break;
      case 'BOOKED':
        setColor('green');
        break;
      case 'OCCUPIED':
        setColor('#006663');
        break;
    }
  }, [seatType]);

  const onClick = () => {
    // console.log('seatType', seatSelectionType);

    /*const field =
      seatSelectionType === 'mainTravel'
        ? 'travelDetail.mainTravel.selectedSeats'
        : 'travelDetail.returnTravel.selectedSeats';*/
    // users can only select 3 seat in total
    const field = `travelDetail.${seatSelectionType}.selectedSeats`;

    if (seatType === 'SELECTED') {
      // remove seat from selectedSeats
      const modifiedSeats = values.travelDetail[
        seatSelectionType
      ].selectedSeats.filter(seat => seat !== seatNumber);

      setFieldValue(field, modifiedSeats);
      setSeatType('AVAILABLE');

      if (formik.errors.seatError) {
        formik.setFieldError('seatError', '');
      }
      return;
    }

    if (values.travelDetail[seatSelectionType].selectedSeats?.length === 3) {
      formik.setFieldError('seatError', 'You can only select 3 seats in total');
      return;
    }

    if (seatType === 'AVAILABLE') {
      const modifiedSeats = [
        ...values.travelDetail[seatSelectionType].selectedSeats,
        seatNumber,
      ];
      setSeatType('SELECTED');
      setFieldValue(field, modifiedSeats);

      if (formik.errors.seatError) {
        formik.setFieldError('seatError', '');
      }
    }
  };

  return (
    <div
      className={clsx([
        s.seat_container,
        seatType === 'SELECTED' && s.selected,
        seatType === 'RESERVED' && s.reserved,
        seatType === 'AVAILABLE' && s.available,
      ])}
      style={{
        cursor: ['reserved', 'occupied'].includes(seatType)
          ? 'not-allowed'
          : 'pointer',
        paddingRight: '0.4rem',
        paddingLeft: '0.4rem',
        marginLeft: 'auto',
      }}
      onClick={onClick}
    >
      <Icon color={color} />
      <Typography variant="body1" className={s.seat_num}>
        {seatNumber}
      </Typography>
    </div>
  );
};

export default SeatIcon;
