import React, { useEffect, useState } from 'react';
import './traveldetial.scss';
import Typography from '@mui/material/Typography';
import { useFormikContext } from 'formik';
import PassengerInfo from './PassengerInfo';
import { BookingStepFormValue } from '../types';
import { Chip } from '@mui/material';
import s from '../../HomePage/Hero/hr.module.scss';
import clsx from 'clsx';

const PassengerDetail = ({}) => {
  const [passengersDetails, setPassengersDetails] = useState([]);
  const [resetData, setResetData] = useState(false);
  const [seatNumbers, setSeatNumbers] = useState([]);

  const changePassengerDetails = passengerDetails => {
    setResetData(!resetData);
    setPassengersDetails(passengerDetails);
  };

  const { values, errors } = useFormikContext<BookingStepFormValue>();

  // console.log('values ch : ', values, errors);

  useEffect(() => {
    const allSeats = [
      ...values.travelDetail.mainTravel.selectedSeats, // ...(values.travelDetail?.returnTravel?.selectedSeats || []),
    ];

    setSeatNumbers(allSeats);
  }, []);

  return (
    <div className="td_pdetail flex flex-col space-y-3 text-stone-900">
      <div className="flex flex-col space-y-1 gap-4">
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Passengers Details
        </Typography>
        <div className="h-full flex flex-col justify-between items-start space-y-3">
          {seatNumbers?.map((seatNumber, index) => {
            return (
              <PassengerInfo
                key={index}
                setPassengersDetails={arr => {
                  changePassengerDetails(arr);
                }}
                passengersDetails={passengersDetails}
                index={index}
                seatNumber={seatNumber}
                returnSeatNumber={
                  values.travelDetail.returnTravel?.selectedSeats[index]
                }
              />
            );
          })}

          {errors?.passengersError && (
            <Chip
              variant="outlined"
              // size="small"
              color="error"
              className={clsx(['bg-red-400'])}
              label={errors?.passengersError as string}
            />
          )}

          <div className="flex items-start hidden">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 border bg-transparent border-[#ff6b1b] focus:ring-3 focus:ring-[#ff6b1b] "
                // required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="remember" className=" text-xs">
                Create an account using the main passenger Information?
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetail;
