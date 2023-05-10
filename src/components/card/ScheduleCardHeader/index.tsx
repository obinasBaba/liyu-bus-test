import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useSelector } from 'react-redux';
import {
  AirlineSeatLegroomNormal,
  CalendarMonth,
  DirectionsBus,
  LocationOn,
  MyLocation,
} from '@mui/icons-material';
import s from './sd.module.scss';
import {
  Avatar,
  Button,
  Chip,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import clsx from 'clsx';
import { StoreType } from '../../../redux/store';
import { useFormikContext } from 'formik';
import moment from 'moment';
import { red } from '@mui/material/colors';

const ScheduleCardHeader = ({ disabled, schedule, seatSelectionType }) => {
  const tripInfo = useSelector((state: StoreType) => state.search.tripInfo);

  const { values } = useFormikContext<any>();
  const selectionDetail = values.travelDetail[seatSelectionType];

  // console.log('value: ', seatSelectionType, values.travelDetail[seatSelectionType]);

  let remainingSeats;
  let returnTravelRemainingSeats;

  if (tripInfo?.twoWayTrip) {
    remainingSeats =
      60 - // searchResult?.occupiedSeats?.length -
      schedule.reservedSeats?.length;
  } else {
    if (!schedule?.firstTrip) {
      remainingSeats =
        60 - // searchResult?.occupiedSeats?.length -
        schedule.reservedSeats?.length;
    } else {
      remainingSeats =
        60 -
        schedule?.firstTrip[0].occupiedSeats?.length -
        schedule?.firstTrip[0].reservedSeats?.length;
      returnTravelRemainingSeats =
        60 -
        schedule?.secondTrip[0].occupiedSeats?.length -
        schedule?.secondTrip[0].reservedSeats?.length;
    }
  }

  const totalTime = moment(schedule?.arrivalTime, 'HH:mm').diff(
    moment(schedule?.departureTime, 'HH:mm'),
    'hours',
  );
  // const departureTime = moment(totalTime, 'HH:mm').format('hh:mm A');
  const departureTime = moment(totalTime, 'HH:mm').format('hh:mm');

  const avSeats =
    schedule.maxAvailableSeat -
      (schedule?.reservedSeats?.length + schedule?.bookedSeats?.length) || 0;

  return (
    <div className={s.sd_container}>
      <div className={s.wrapper}>
        <div className={clsx([s.left])}>
          <header>
            <ListItem
              alignItems="center"
              className={s.org}
              secondaryAction={
                <div className="flex gap-1 items-center text-gray-500">
                  <CalendarMonth />
                  <Typography>
                    {new Date(schedule.departureDate).toDateString() || '-'}
                  </Typography>
                </div>
              }
            >
              <ListItemAvatar>
                {/*<Avatar alt={schedule?.busCompany || 'Bus'} />*/}
                <Avatar
                  sx={{ width: '2rem', height: '2rem', bgcolor: red[500] }}
                  // src="/buses/bus0.jfif"
                  src={`/buses2/${schedule?.busCompanyUUid}.jfif`}
                >
                  <DirectionsBus />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography>{schedule?.busCompany || '-'}</Typography>}
              />
            </ListItem>
          </header>

          <div className={s.schedule_info}>
            <div className="flex flex-col items-center">
              <Typography noWrap variant="h5" className={s.loc_name}>
                {schedule.route.departureLocationName}
              </Typography>
              <Typography variant="caption" color="gray" noWrap>
                Departure Time
              </Typography>
              <div className="flex items-center gap-1 text-gray-500">
                <AccessTimeIcon fontSize="small" />
                <Typography variant="caption">
                  {schedule.departureTime}
                  {/*moment(schedule?.departureTime, 'HH:mm').format('hh:mm A')*/}
                </Typography>
              </div>
            </div>

            <div className={s.dep_dest}>
              <div className={s.line}>
                <MyLocation />
                <div />
                <LocationOn />
              </div>
              <div className={s.hour}>
                <AccessTimeIcon color="primary" />
                <Typography variant="body2" color="gray">
                  {departureTime}
                </Typography>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <Typography noWrap variant="h5" className={s.loc_name}>
                {schedule.route.destinationLocationName}
              </Typography>
              <Typography variant="caption" color="gray" noWrap>
                Arrival Time
              </Typography>
              <div className="flex items-center gap-1 text-gray-500">
                <AccessTimeIcon fontSize="small" />
                <Typography variant="caption">
                  {schedule.arrivalTime}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <Divider orientation="vertical" />

        <div className={clsx([s.right])}>
          <Chip
            sx={{
              '& > span': {
                paddingRight: 0,
              },
            }}
            label={
              <Typography variant="body2" color="gray">
                <AirlineSeatLegroomNormal /> Tariff &nbsp; : &nbsp;
                <Chip
                  color="primary"
                  label={`${schedule.tariff.amount || '-'} ETB`}
                  variant="outlined"
                />
              </Typography>
            }
          />

          <Button size="large" variant="outlined" fullWidth className={s.tarif}>
            Select Seat ( {schedule?.availableSeats || '-'} left )
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCardHeader;
