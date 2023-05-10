import React, { useEffect } from 'react';
import QRCode from 'react-qr-code';
import { demohtmltopdf } from '../../../services/utils';
import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';
import s from './ticket.module.scss';
import { useBookedData } from '../../../actions/bookedData';
import numToWords from 'num-words';

const Ticket = () => {
  const { data } = useBookedData();

  console.log('ticket data :', data);

  useEffect(() => {}, []);

  return (
    <div className={s.container}>
      <div className=" py-3">
        <div className="w-full mx-auto text-left">
          <Stack spacing={2}>
            <Typography variant="h5">
              THANK YOU FOR TRAVELING WITH US
            </Typography>

            <Alert severity="info" sx={{ width: 'max-content' }}>
              <AlertTitle>
                <Typography variant="h6">Remember</Typography>
              </AlertTitle>
              Dont forget to bring your ticket on the departure date
            </Alert>

            {/* {passengersDetails?.main?.selectedSeats?.map(() => {
              return ( */}
            <div
              id="ticket"
              className="mt-7 w-full bg-[whitesmoke] p-5 rounded-xl"
            >
              <header className="flex justify-between items-center border-b-4 border-black p-4">
                <Typography variant="h4" className="text-2xl">
                  ABAY BUS
                </Typography>
                <Typography variant="body1">Invoice number 09197517</Typography>
              </header>
              <div className="flex flex-col mt-4">
                <Typography gutterBottom>PASSENGER NAME</Typography>

                <div className="flex flex-col">
                  <Typography variant="h6">
                    {data?.firstName || '-'} {data?.lastName || '-'}
                  </Typography>
                  <div className="my-1 flex gap-3 mt-4">
                    <div className="flex grow gap-1">
                      <div className="flex flex-col justify-around">
                        <span className="text-xs">FROM</span>
                        <span className="text-xs">SEAT</span>
                        <span className="text-xs">ON BOARDING</span>
                        <span className="text-xs">DEPARTURE DATE</span>
                        <span className="text-xs">AMOUNT PAID (NUM)</span>
                      </div>
                      <div className="flex w-full max-w-[50%]  flex-col justify-around">
                        <span className="text-xs bg-white p-2 rounded-sm font-semibold block  my-1">
                          {data?.from || '-'}
                        </span>
                        <span className="text-xs bg-white p-2 rounded-sm font-semibold block  my-1">
                          {data?.seatNumber || '-'}
                        </span>
                        <span className="text-xs bg-white p-2 rounded-sm font-semibold block  my-1">
                          {data?.onBoardingPlace || '-'}
                        </span>
                        <span className="text-xs bg-white p-2 rounded-sm font-semibold block  my-1">
                          {new Date(data?.departureDate).toDateString()}
                        </span>
                        <span className="text-xs bg-white p-2 rounded-sm font-semibold block  my-1">
                          {data?.totalPrice || '-'}
                        </span>
                      </div>
                    </div>

                    <div className="flex grow gap-1">
                      <div className="flex flex-col justify-around">
                        <span className="text-xs">TO</span>
                        <span className="text-xs invisible">TO</span>
                        <span className="text-xs">OFF BOARDING</span>
                        <span className="text-xs">DEPARTURE TIME</span>
                        <span className="text-xs">AMOUNT PAID (WORD)</span>
                      </div>
                      <div className="flex w-full max-w-[50%] flex-col justify-around">
                        <span className="text-xs bg-white p-2.5 rounded-sm font-semibold block  my-1">
                          {data?.to || '-'}
                        </span>
                        <span className="text-xs bg-white p-2.5 rounded-sm font-semibold block  my-1 invisible">
                          BAHIR DAR
                        </span>
                        <span className="text-xs bg-white p-2.5 rounded-sm font-semibold block  my-1">
                          {data?.offBoardingPlace || '-'}
                        </span>
                        <span className="text-xs bg-white p-2.5 rounded-sm font-semibold block  my-1">
                          {data?.departureTime || '-'}
                        </span>
                        <span className="text-xs bg-white p-2.5 rounded-sm font-semibold block  my-1">
                          {numToWords(data?.totalPrice || 0)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-grow flex-col items-center self-center">
                      <div className=" text-center gap-4">
                        <QRCode
                          // size={256}
                          className={s.qrcode}
                          style={{
                            height: 'auto', // maxWidth: '100%',
                            width: '120px',
                          }}
                          value="784545A"
                          viewBox={`0 0 256 256`}
                        />
                        <span className="text-xs">784545A</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col  space-y-1 mt-6 my-4 font-bold">
                    <span className="text-center text-sm ">REMINDER</span>
                    <p className="text-center text-xs">
                      This is a one time travel ticket, please arrive at the bus
                      station at least 15 minutes before departure.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-5">
              <Button
                size="large"
                onClick={() => {
                  demohtmltopdf('ticket', 'ticket1');
                }}
                className="rounded-none"
                disabled
                variant="outlined"
              >
                Print Ticket
              </Button>
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  demohtmltopdf('ticket', 'ticket1');
                }}
              >
                Download Ticket
              </Button>
            </div>
            {/* );
            })} */}
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
