import React, { useEffect, useState } from 'react';
import RouteDetail from './RouteDetail';
import { Box, Card, Chip, Divider, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { StoreType } from '../../../redux/store';
import s from './checkout.module.scss';
import { useSchedules } from '../../../actions/schedules';
import { useFormikContext } from 'formik';
import { BookingStepFormValue } from '../types';
import { Alert, AlertTitle } from '@mui/lab';

const Checkout = ({}) => {
  // const navigate = useNavigate();
  // const [show, setShow] = useState(false);
  // const [main, setMain] = useState(null);

  const [details, setDetails] = useState<
    typeof values.travelDetail.mainTravel[] & any
  >([]);
  const tripInfo = useSelector((state: StoreType) => state?.search.tripInfo);
  const schedules = useSchedules();
  const [mainSchedule, setMainSchedule] = useState<any>(null);
  const [returnSchedule, setReturnSchedule] = useState<any>(null);

  const formik = useFormikContext<BookingStepFormValue>();
  const { values } = formik;

  // console.log('fomick value: ', details);

  useEffect(() => {
    // scroll to the top of the document
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    //:) there is going to be always a main travel
    const mainScheduleId = values.travelDetail.mainTravel.schedule;

    const all = [
      ...(schedules.data.firstTrip?.alternatives || []),
      ...(schedules.data.firstTrip?.schedules || []),
    ];

    const mainSchedule = all?.find(
      schedule => schedule.uuid === mainScheduleId,
    );

    // console.log('mainID: ', mainScheduleId);
    // console.log('main: ', schedules.data?.firstTrip?.schedules);

    const mappedDetails = [
      {
        ...values.travelDetail.mainTravel,
        dropOffPoint: mainSchedule?.dropOffPoints?.find(
          point =>
            point.scheduleLocationUUId ===
            values.travelDetail.mainTravel.dropOffPoint,
        ),

        boardingPoint: mainSchedule?.boardingPoints?.find(
          point =>
            point.scheduleLocationUUId ===
            values.travelDetail.mainTravel.boardingPoint,
        ),
        schedule: mainSchedule,
      },
    ];

    // check if there is a return travel
    if (tripInfo?.twoWayTrip) {
      const all = [
        ...(schedules.data.secondTrip.alternatives || []),
        ...(schedules.data.secondTrip.schedules || []),
      ];

      const returnScheduleId = values.travelDetail.returnTravel.schedule;
      const returnSchedule = all?.find(
        schedule => schedule.uuid === returnScheduleId,
      );

      mappedDetails.push({
        ...values.travelDetail.returnTravel,
        dropOffPoint: returnSchedule?.dropOffPoints?.find(
          point =>
            point.scheduleLocationUUId ===
            values.travelDetail.returnTravel.dropOffPoint,
        ),

        boardingPoint: returnSchedule?.boardingPoints?.find(
          point =>
            point.scheduleLocationUUId ===
            values.travelDetail.returnTravel.boardingPoint,
        ),
        schedule: returnSchedule,
      });

      setReturnSchedule(returnSchedule);

      console.log('returnSchedule: ', returnSchedule);
    }

    // console.log('mainScheduleId: ', mappedDetails, mainSchedule);

    setDetails(mappedDetails);
    setMainSchedule(mainSchedule);
  }, []);

  // console.log('mainSchedule -: ', mainSchedule);
  // console.log(' return: ', returnSchedule);

  return (
    <div className={s.cc_container}>
      {formik.errors.bookingError && (
        <Alert severity="error" className={s.alert}>
          <Typography>{formik.errors.bookingError as string}</Typography>
        </Alert>
      )}

      {/* <Alert severity="info">
        <AlertTitle>Note</AlertTitle>
        Please arrive at boarding place at least 15 minutes before the take-off
        time
      </Alert>*/}

      <RouteDetail details={details} />

      <div className={s.passenger_detail}>
        <Typography sx={{ fontWeight: 'bold' }} variant="h5">
          Passengers Name
        </Typography>

        <Stack
          direction="row"
          divider={<Divider orientation="vertical" sx={{ height: 'auto' }} />}
          spacing={2}
        >
          {values.passengersDetails.map(
            ({ firstName, lastName, phone }, idx) => (
              <Typography key={idx}>
                &nbsp;
                {firstName} {lastName}
              </Typography>
            ),
          )}
        </Stack>
      </div>

      <Card className={s.rd_price_detail}>
        <div className={s.rd_price_card}>
          <div className={s.rd_price_card__item}>
            <Typography variant="body2" color="gray">
              {tripInfo?.twoWayTrip && 'Departure'} Tariff ( ETB )
            </Typography>
            <div className={s.prices}>
              <Chip
                label={`${mainSchedule?.tariff?.amount} ETB`}
                size="small"
              />
            </div>
          </div>

          {returnSchedule?.tariff?.amount && (
            <div className={s.rd_price_card__item}>
              <Typography variant="body2" color="gray">
                Return Tariff ( ETB )
              </Typography>
              <div className={s.prices}>
                <Chip
                  label={` ${returnSchedule?.tariff?.amount} ETB`}
                  size="small"
                />
              </div>
            </div>
          )}

          <div className={s.rd_price_card__item}>
            <Typography variant="body2" color="gray">
              No Of Passengers
            </Typography>
            <Typography variant="body2" color="gray">
              {values.passengersDetails.length}
            </Typography>
          </div>

          <div className={s.rd_price_card__item}>
            <Box display="flex" alignItems="center" gap=".5rem">
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Total{' '}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {values.passengersDetails.length *
                (mainSchedule?.tariff?.amount +
                  (returnSchedule?.tariff?.amount || 0) || 1)}{' '}
              ETB
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Checkout;
