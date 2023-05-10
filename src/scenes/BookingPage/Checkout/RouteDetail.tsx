import {
  Avatar, Chip, Divider, Stack, Step, StepLabel, Stepper, useMediaQuery, useTheme,
} from '@mui/material';
import { red } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import {
  CalendarMonth,
  DirectionsBus,
  LocationOn,
  MyLocation,
} from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import s from './checkout.module.scss';
import moment from 'moment';
import React from 'react';

const DetailInformation = ({ details = [] }) => {
  // console.log('details: ', details);
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('sm'));


  return (
    <div className={s.route_detail}>
      <Typography variant="h5">Confirm Booking</Typography>

      {details.map((detail, index) => (
        <>
          <Stack spacing={3} className={s.route_detail__item} key={index}>
            <header>
              <Stack direction="row" spacing={1.5}>
                <Typography fontWeight={900}>
                  {index === 0 ? 'First Trip' : 'Round Trip'}
                </Typography>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <CalendarMonth color="disabled" />
                  <Typography variant="body2" color="#e74f00">
                    {moment(detail.schedule?.departureDate)?.format(
                      'DD MMM YYYY',
                    ) || '-'}
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" px={1.5} spacing={1}>
                <Avatar
                  sx={{ width: '2.3rem', height: '2.3rem', bgcolor: red[500] }}
                  // src="/buses/bus0.jfif"
                  src={`/buses2/${detail?.schedule?.busCompanyUUid}.jfif`}
                >
                  <DirectionsBus />
                </Avatar>
                <Typography variant="h6" color="gray">
                  {detail.schedule?.busCompany}
                </Typography>
              </Stack>
            </header>

            <Stack direction={match ? "row" : "column"} spacing={3}>
              <Stack spacing={1} width="100%" flex={0.8}>
                <div className={s.rd_info_card}>
                  <Stepper orientation="vertical">
                    <Step sx={{ padding: '0' }}>
                      <StepLabel
                        StepIconComponent={MyLocation}
                        className={s.step_label}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          className={s.loc_name}

                          // justifyContent="space-between"
                        >
                          <Typography variant="h6" sx={{ fontWeight: '900' }}>
                            {detail.schedule?.route?.departureLocationName}
                          </Typography>

                          <Chip
                            label={
                              <Typography variant="body2" color="gray">
                                Onboarding :{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                  {detail?.boardingPoint?.terminalName || '-'}
                                </span>
                              </Typography>
                            }
                            // size="small"
                          />
                        </Stack>

                        <Typography
                          variant="caption"
                          sx={{ fontWeight: '900' }}
                        >
                          {detail.schedule?.departureTime}
                        </Typography>
                      </StepLabel>
                    </Step>

                    <Step sx={{ padding: '0' }}>
                      <StepLabel
                        StepIconComponent={LocationOn}
                        className={s.step_label}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          className={s.loc_name}
                          // justifyContent="space-between"
                        >
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: '900', color: 'black' }}
                          >
                            {detail.schedule?.route?.destinationLocationName}
                          </Typography>

                          <Chip
                            label={
                              <Typography variant="body2" color="gray">
                                Offboarding :{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                  {detail?.dropOffPoint?.terminalName || '-'}
                                </span>
                              </Typography>
                            }
                            // size="small"
                          />
                        </Stack>

                        <Typography
                          variant="caption"
                          sx={{ fontWeight: '900' }}
                        >
                          {detail.schedule?.arrivalTime}
                        </Typography>
                      </StepLabel>
                    </Step>
                  </Stepper>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <AccessTimeIcon />
                    <Typography variant="body2" color="gray">
                      {moment(detail.schedule?.arrivalTime, 'HH:mm:ss').diff(
                        moment(detail.schedule?.departureTime, 'HH:mm:ss'),
                        'hours',
                      )}
                      HR
                    </Typography>
                  </Stack>
                </div>
              </Stack>

              <Divider orientation={match ? 'vertical' : 'horizontal'} />

              <Stack
                flex={0.3}
                style={{ marginLeft: 0, padding: '1rem'}}
                alignItems="center"
                spacing={5}
                direction={match ? "column" : "row"}
              >
                <div>
                  <Typography>Price Per Person :</Typography>

                  <Typography variant="h6">
                    {detail.schedule?.tariff?.amount || '-'} ETB
                  </Typography>
                </div>

                <Stack spacing={1}
                       direction={match ? "column" : "row"}

                >
                  <Chip
                    label={
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 'bold' }}
                        color="gray"
                      >
                        Passengers :{' '}
                        <span>( {detail.selectedSeats.length} )</span>
                      </Typography>
                    }
                    // size="small"
                  />

                  <Chip
                    label={
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 'bold' }}
                        color="gray"
                      >
                        Seat :{' '}
                        <span>( {detail.selectedSeats.join(', ')} )</span>
                      </Typography>
                    }
                    // size="small"
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </>
      ))}
    </div>
  );
};

export default DetailInformation;
