import React from 'react';
import {
  Card,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import {
  LocationOn,
  MyLocation,
  RadioButtonChecked,
  RadioButtonUnchecked,
  Search,
} from '@mui/icons-material';
import s from './activeroutes.module.scss';
import useActiveTrips from '../../../actions/activeTrips';
import { setTripInfo, TripInfo } from '../../../redux/search';
import { useDispatch } from 'react-redux';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertTitle } from '@mui/lab';

const ActiveTrips = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeTripsQuery = useActiveTrips();
  const { data: activeRoutes } = activeTripsQuery;

  console.log('activeRoutes :', activeRoutes);

  const onClick = (from: TripInfo['from'], to: TripInfo['to']) => {
    const tripInfo: TripInfo = {
      from,
      to,
      twoWayTrip: false,
      departureDate: moment().add(1, 'day').format('YYYY-MM-DD'),
      bus: { label: '', id: '' },
      invoker: 'active-trips',
      createdAt: moment().toDate().toString(),
    };

    dispatch(setTripInfo(tripInfo));
    navigate('/booking');
  };

  return (
    <div className={s.ar_container}>
      {/*<div className="paths_effect bg-[url('/public/img/paths.png')] bg-no-repeat bg-cover bg-center bg-static" />*/}

      <Container maxWidth="xl" className={s.ar_wrapper}>
        <header>
          <Typography variant="h2" className={s.ar_title}>
            Available Routes
          </Typography>
          <Typography variant="body1" color="gray">
            Access your trips easily
          </Typography>
        </header>

        <div className={s.ar_route_list}>
          {activeTripsQuery.isLoading && (
            <div className={s.ar_loading}>
              <CircularProgress color="primary" />
            </div>
          )}

          {!activeTripsQuery.isLoading && activeTripsQuery.status === 'error' && (
            <div className={s.ar_loading}>
              <Alert severity="error">
                <AlertTitle>
                  <Typography variant="h6">Something goes wrong</Typography>
                </AlertTitle>
                <p>
                  Failed to load <b>Available Routes</b>, please try again later
                </p>
              </Alert>
            </div>
          )}

          {activeRoutes &&
            Array.isArray(activeRoutes) &&
            activeRoutes?.map(({ departure, destination }, idx) => (
              <Card
                className={s.ar_route_card}
                elevation={2}
                key={idx}
                onClick={() => {
                  // console.log('depature: ', departure);

                  onClick(
                    { label: departure.addressDescription, id: departure.uuid },
                    {
                      label: destination.addressDescription,
                      id: destination.uuid,
                    },
                  );
                }}
              >
                <div className={s.route}>
                  <Chip
                    className={s.chip}
                    label={
                      <Typography variant="body1" className={s.label}>
                        {departure.addressDescription}
                      </Typography>
                    }
                  />

                  <div className={s.line}>
                    <MyLocation />
                    <div />
                    <LocationOn />
                  </div>

                  <Chip
                    className={s.chip}
                    label={
                      <Typography variant="body1" className={s.label}>
                        {destination.addressDescription}
                      </Typography>
                    }
                  />

                  <IconButton>
                    <Search color="primary" />
                  </IconButton>
                </div>
              </Card>
            ))}
        </div>

        <div className={s.pagination}>
          {new Array(1).fill(0).map((item, idx) => (
            <IconButton key={item + idx + item}>
              {idx === 0 ? (
                <RadioButtonChecked color="primary" />
              ) : (
                <RadioButtonUnchecked />
              )}
            </IconButton>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ActiveTrips;
