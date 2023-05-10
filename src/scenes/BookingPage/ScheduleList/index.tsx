import React, { useEffect, useLayoutEffect, useState } from 'react';
import DateFilter from './DateFilter';
import ScheduleCard from './ScheduleCard';
import s from './sl.module.scss';
import { Trip, useSchedules } from '../../../actions/schedules';
import { Alert, AlertTitle } from '@mui/lab';
import { Button, CircularProgress, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';

const ScheduleList = ({
  seatSelectionType,
}: {
  seatSelectionType: 'mainTravel' | 'returnTravel';
}) => {
  const [loading, setLoading] = useState(false);
  const sData = useSchedules();

  const { data: allSchedules, isLoading, isFetching } = sData;
  const [trip, setTrip] = useState<Trip>({
    schedules: [],
    alternatives: [],
    alternativesNotFound: false,
    notFound: false,
    scheduleNotFound: false,
  });

  // console.log('sData: ', trip);
  // console.log('allSchedules: ', allSchedules);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    if (isLoading) return;
    // console.log('seatSelectionType --->: ',  seatSelectionType, data);

    // change this to enums
    if (seatSelectionType === 'mainTravel' && allSchedules?.firstTrip) {
      setTrip(allSchedules?.firstTrip);
    } else if (
      seatSelectionType === 'returnTravel' &&
      allSchedules?.secondTrip
    ) {
      setTrip(allSchedules?.secondTrip);
    }
  }, [sData]);

  // if (!trip) return null;

  const notFound =
    (allSchedules?.secondTrip?.notFound || allSchedules?.firstTrip?.notFound) &&
    !isLoading;

  return (
    <div className={s.sl_container}>
      <div className={s.sl_wrapper}>
        <DateFilter
          loading={loading}
          setLoading={setLoading}
          seatSelectionType={seatSelectionType}
        />

        {/*<Typography>Search Result ({schedules?.length})</Typography>*/}

        {sData.status === 'error' && !isLoading && (
          <Alert severity="error" color="error" className={s.alert}>
            <AlertTitle>
              <Typography variant="h6">Network error</Typography>
            </AlertTitle>
            <Typography>
              network fail, check your internet connection please.
            </Typography>
          </Alert>
        )}

        {notFound && (
          <div className={s.notfound}>
            <Alert severity="info" color="warning" className={s.alert}>
              <AlertTitle>
                <Typography variant="h6">Search Not Found</Typography>
              </AlertTitle>
              <Typography>
                There are no buses found for the given information.
              </Typography>
            </Alert>
            <Button
              size="large"
              variant="contained"
              startIcon={<ChevronLeftIcon />}
            >
              <Link to="/">Go Back</Link>
            </Button>
          </div>
        )}

        <div className={s.sl_card_list}>
          {trip.schedules.length === 0 && isLoading && (
            <div className={s.loading}>
              <CircularProgress />
            </div>
          )}

          {sData.status !== 'error' && !isLoading && !notFound && (
            <>
              <Typography
                variant="h6"
                color="gray"
                className={s.available_title}
              >
                Available Buses ({trip.schedules.length})
              </Typography>
              {trip.schedules.map(schedule => {
                return (
                  <ScheduleCard
                    schedule={schedule}
                    loading={loading}
                    key={schedule.uuid}
                    seatSelectionType={seatSelectionType}
                  />
                );
              })}
            </>
          )}

          {!trip.alternativesNotFound &&
            trip.scheduleNotFound &&
            !isLoading &&
            trip?.alternatives.length > 0 &&
            sData.status !== 'error' && (
              <>
                <Alert severity="info" color="warning" className={s.alert}>
                  <AlertTitle>
                    <Typography variant="h6">Search Not Found</Typography>
                  </AlertTitle>
                  <Typography>
                    There are no buses found for the given information, but you
                    can use the following bus alternatives:
                  </Typography>
                </Alert>
                <div className={s.alternatives}>
                  <Typography variant="h5" className={s.alternative_title}>
                    Alternative Buses ({trip.alternatives.length})
                  </Typography>
                  {trip.alternatives.map(schedule => {
                    return (
                      <ScheduleCard
                        schedule={schedule}
                        loading={loading}
                        key={schedule.uuid}
                        seatSelectionType={seatSelectionType}
                      />
                    );
                  })}
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleList;
