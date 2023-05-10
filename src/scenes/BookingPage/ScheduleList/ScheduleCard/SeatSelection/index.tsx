import React, { useEffect, useState } from 'react';
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import SeatIcon from '../../../../../components/searchResults/SeatIcon';

import { useFormikContext } from 'formik';
import {
  ArrowBack,
  ArrowForward,
  AttachMoney,
  Person,
} from '@mui/icons-material';
import s from './sselection.module.scss';
import clsx from 'clsx';
import { BookingStepFormValue } from '../../../types';
import { useFormStepContext } from '../../../index';

const topSeatsFirstRow = [4, 5, 12, 13, 20, 21, 28, 29, 36, 37, 44, 45];
const topSeatsSecondRow = [3, 6, 11, 14, 19, 22, 27, 30, 35, 38, 43, 46];
const middle = [47];
const bottomSeatsFirstRow = [2, 7, 10, 15, 18, 23, 26, 31, 34, 39, 42, 48];
const bottomSeatsSecondRow = [1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 49];

export type BookingStatus =
  | 'RESERVED'
  | 'OCCUPIED'
  | 'AVAILABLE'
  | 'SELECTED'
  | 'BOOKED';

// white, green, red, blue
const legendData = [
  {
    label: 'Available',
    color: '#FFFFFF',
  },
  {
    label: 'Reserved',
    color: '#123',
  },
  {
    label: 'Occupied',
    color: 'green',
  } /*{
    label: 'Booked',
    color: 'green',
  },*/,
  {
    label: 'Selected',
    color: '#e74f00',
  },
];

const SeatSelection = ({ seatSelectionType, schedule }) => {
  const [seats, setSeats] = useState([]);
  const { values, handleChange, errors } =
    useFormikContext<BookingStepFormValue>();

  const selectionDetail = values.travelDetail[seatSelectionType];

  const ctx = useFormStepContext();
  // console.log('value: ', values);

  const [dropOffPoints, setDropOffPoints] = useState([]);
  const [boardingPoints, setBoardingPoints] = useState([]);

  // console.log('scheduel: ', schedule);

  const getSeatType = (seatNo: any) => {
    // console.log('seatNo: ', seatNo);

    let seat = schedule.bookedSeats?.find(
      reserved => reserved.seatNumber == seatNo,
    );

    if (!seat) {
      seat = schedule.reservedSeats?.find(
        reserved => reserved.seatNumber == seatNo,
      );
    }

    // console.log('seat: ', seat);

    /*console.log(
      'selected: ',
      values?.travelDetail?.[seatSelectionType]?.selectedSeats,
      seatSelectionType,
      values,
    );*/

    if (seat) {
      return seat.bookingStatus as BookingStatus;
    } else if (
      values?.travelDetail?.[seatSelectionType]?.selectedSeats?.indexOf(
        formatSeatNo(seatNo),
      ) !== -1
    ) {
      return 'SELECTED';
    } else {
      return 'AVAILABLE';
    }
  };

  const formatSeatNo = seatNo => {
    return seatNo.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  useEffect(() => {
    const mappedSeats = [
      topSeatsSecondRow,
      topSeatsFirstRow,
      middle,
      bottomSeatsFirstRow,
      bottomSeatsSecondRow,
    ].map(row => {
      return row.map(seatNo => ({
        seatNumber: formatSeatNo(seatNo),
        seatType: getSeatType(formatSeatNo(seatNo)),
      }));
    });

    // console.log('mapped --: ', mappedSeats);

    setSeats(mappedSeats);
  }, [values, schedule]);

  useEffect(() => {
    let boardingPoints =
      schedule?.boardingPoints?.map(boardingPoint => ({
        label: boardingPoint?.terminalName,
        value: boardingPoint?.scheduleLocationUUId,
      })) || [];

    let dropOffPoints =
      schedule?.dropOffPoints?.map(dropOffPoint => ({
        label: dropOffPoint?.terminalName,
        value: dropOffPoint?.scheduleLocationUUId,
      })) || [];

    setBoardingPoints(boardingPoints);
    setDropOffPoints(dropOffPoints);

    // console.log( 'boardingPoints', boardingPoints )
    // console.log( 'dropOffPoints', dropOffPoints )
  }, [schedule]);

  return (
    <div className={clsx([s.ss_container, 'flex w-full'])}>
      <div className={s.wrapper}>
        <div className={s.ver}>
          <Typography className={s.select_seat_title}>
            Click on a seat to select/deselect
          </Typography>

          <div className={s.seat_wrapper}>
            <div className={s.front_seat}>
              <SeatIcon
                seatNumber={(0o0).toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
                seatType="RESERVED"
                seatSelectionType={seatSelectionType}
              />
              <img
                alt="steering wheel"
                src="/img/steering-wheel.png"
                className={s.wheel}
              />
            </div>
            <div className={s.row_wrapper}>
              {seats.map((row, index) => (
                <div key={index} className={clsx([s.row])}>
                  {row?.map((seat, idx) => {
                    return (
                      <SeatIcon
                        key={seat.seatNumber}
                        seatNumber={seat.seatNumber}
                        seatType={seat.seatType}
                        seatSelectionType={seatSelectionType}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className={s.legend}>
            {legendData.map((legend, index) => (
              <div key={index} className={s.legend_item}>
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: legend.color }}
                ></div>
                <Typography variant="caption" color="gray">
                  {legend.label}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        <div className={s.form_control}>
          <Typography className={s.select_seat_title}>
            Booking Details
          </Typography>

          <div className={s.selection_detail}>
            <div className="flex items-center">
              <Person />
              <Typography noWrap variant="caption" color="gray">
                ( {selectionDetail?.selectedSeats?.length || 0} ) Seat
              </Typography>
            </div>

            <div className="flex items-center">
              <AttachMoney />
              <Typography noWrap variant="caption" color="gray">
                Tariff : ( {selectionDetail?.selectedSeats?.length || 0} *{' '}
                {schedule.tariff.amount || 300} ) ={' '}
                <b>
                  {selectionDetail?.selectedSeats?.length
                    ? schedule.tariff.amount *
                      selectionDetail?.selectedSeats?.length
                    : 0}
                </b>
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-0.5">
            <Typography noWrap color="gray">
              Total Tariff : ({' '}
              {selectionDetail?.selectedSeats?.length
                ? schedule.tariff.amount *
                  selectionDetail?.selectedSeats?.length
                : 0}{' '}
              )
            </Typography>
            <Typography> ETB </Typography>
          </div>

          <div className={s.points}>
            <FormControl fullWidth required={boardingPoints.length > 0}>
              <InputLabel
                sx={{
                  backgroundColor: 'rgba(246, 211, 189, 1)',
                  padding: '0 .2rem',
                }}
              >
                Onboarding point
              </InputLabel>
              <Select
                name={`travelDetail.${seatSelectionType}.boardingPoint`}
                value={values.travelDetail[seatSelectionType].boardingPoint}
                onChange={handleChange}
              >
                {boardingPoints.length > 0 &&
                  boardingPoints.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      value={option.value}
                      // selected={values.dropOffPoint === option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required={dropOffPoints.length > 0}>
              <InputLabel
                sx={{
                  backgroundColor: 'rgba(246, 211, 189, 1)',
                  padding: '0 .2rem',
                }}
              >
                Offboarding point
              </InputLabel>
              <Select
                name={`travelDetail.${seatSelectionType}.dropOffPoint`}
                value={values.travelDetail[seatSelectionType].dropOffPoint}
                onChange={handleChange}
              >
                {dropOffPoints.map((option, index) => (
                  <MenuItem
                    key={index}
                    value={option.value}
                    // selected={values.dropOffPoint === option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div
            className={clsx([
              [
                s.btn_controller,
                seatSelectionType === 'returnTravel' && s.btn_round_trip,
              ],
            ])}
          >
            {
              //show seatSelection error
              errors?.seatError && (
                <Chip
                  variant="outlined"
                  size="small"
                  color="error"
                  className={s.ss_err_msg}
                  label={errors?.seatError as string}
                />
              )
            }

            {seatSelectionType === 'returnTravel' && (
              <Button
                variant="contained"
                size="large"
                fullWidth
                // type="submit"
                startIcon={<ArrowBack />}
                onClick={() => {
                  ctx.prevStep();
                }}
              >
                Back
              </Button>
            )}

            <Button
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              endIcon={<ArrowForward />}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
