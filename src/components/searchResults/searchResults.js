import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Schedule from '../../scenes/BookingPage/ScheduleList/ScheduleCard';

const steps = [
  'Departure Date',
  'Return Date',
  'Passengers Detail',
  'Checkout',
];

const SearchResults = () => {
  const { request } = useSelector(state => state?.search);
  const {
    schedules: {
      oneWay: { schedules },
    },
  } = useSelector(state => state?.schedule);

  console.log('schedules', schedules, request);

  useEffect(() => {}, [schedules]);

  return (
    <div className="grow mt-10 w-full text-left">
      <Stepper activeStep={0} alternativeLabel orientation="horizontal">
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>
              <Typography variant="h6" color="gray">
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="text-white w-3/4 mx-auto">
        <Typography className="py-3 text-sm">
          Search Result ({schedules?.length})
        </Typography>

        {schedules?.map(schedule => {
          return (
            /*<div className="flex flex-col">
                            <SearchResult schedule={schedule}/>
                        </div>*/

            <Schedule schedule={schedule} />
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
