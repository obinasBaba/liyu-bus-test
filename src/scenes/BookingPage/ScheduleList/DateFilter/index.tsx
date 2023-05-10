import React, { useEffect, useState } from 'react';
import { Button, LinearProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment, { Moment } from 'moment';
import { StoreType } from '../../../../redux/store';
import { setTripInfo } from '../../../../redux/search';
import { useSchedules } from '../../../../actions/schedules';
import s from './datefilter.module.scss';
import { useFormStepContext } from '../../index';
import { TripStepName } from '../../types';
import clsx from 'clsx';

const DateFilter = ({ loading, setLoading, seatSelectionType }) => {
  const dispatch = useDispatch();
  const tripInfo = useSelector((state: StoreType) => state.search.tripInfo);
  const [dates, setDates] = useState<{ date: Moment; selected: boolean }[]>([]);
  const [selectedDate, setSelectedDate] = useState(moment());

  const schedules = useSchedules();
  const { isFetching, isLoading } = schedules;
  const { activeStep } = useFormStepContext();

  useEffect(() => {
    if (isFetching && isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [schedules]);

  useEffect(() => {
    let selectedDate =
      activeStep.name === TripStepName.Departure
        ? moment(tripInfo?.departureDate)
        : moment(tripInfo?.returnDate);

    // console.log('startDate ;', startDate, tripInfo.departureDate);

    // generate 7 days from start date and push to array
    const dateArray = [];

    for (let i = 0; i < 10; i++) {
      const startingDate =
        activeStep.name === TripStepName.Return
          ? moment(tripInfo.departureDate).add(1, 'day')
          : moment();

      const date = startingDate.add(i, 'days');
      dateArray.push({
        selected: date.isSame(selectedDate, 'day'),
        date,
      });
    }

    // console.log('dateArray ;', dateArray);

    setDates(dateArray);
    setSelectedDate(selectedDate);
  }, [activeStep, tripInfo]);

  return (
    <div className={s.container}>
      <div className={s.brp_wrapper}>
        <Typography variant="h6" className={s.brp_month}>
          {selectedDate.format('dddd, MMMM D')}
        </Typography>
        <div className={s.brp_date_list}>
          {dates.map(({ date, selected }, idx) => (
            <div
              className={clsx([s.brp_date_item, selected && s.selected])}
              key={idx}
              onClick={() => {
                if (loading) return;

                // set selected date and deselect others
                const newDates = dates.map((item, index) => ({
                  ...item,
                  selected: index === idx,
                }));

                setDates(newDates);

                if (activeStep.name === TripStepName.Return) {
                  dispatch(
                    setTripInfo({
                      ...tripInfo,
                      returnDate: date.format('YYYY-MM-DD'),
                    }),
                  );
                  return;
                }

                dispatch(
                  setTripInfo({
                    ...tripInfo,
                    departureDate: date.format('YYYY-MM-DD'),
                    returnDate: date.add(1, 'day').format('YYYY-MM-DD'),
                  }),
                );
              }}
            >
              <Button
                variant="contained"
                color={selected ? 'primary' : 'secondary'}
                disabled={loading}
              >
                {date.format('D')}
              </Button>
              <Typography variant="body2" color="text.secondary">
                {date.format('dddd').slice(0, 3)}
              </Typography>
              <span className={clsx([s.line, selected && s.selected])} />
            </div>
          ))}
        </div>

        {loading && (
          <LinearProgress
            className={s.brp_loader}
            color="primary"
            sx={{ marginTop: '-.2rem' }}
          />
        )}
      </div>
    </div>
  );
};

export default DateFilter;
