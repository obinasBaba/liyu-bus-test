import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  CalendarMonth,
  CompareArrows,
  DateRangeSharp,
  DirectionsBus,
  LocationOn,
  RadioButtonChecked,
  Search,
} from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { setTripInfo } from '../../../redux/search';
import { HeroHeader } from './components/HeroHeader';
import moment from 'moment';
import { useLocations } from '../../../actions/locations';
import { useBuses } from '../../../actions/buses';
import { useNavigate } from 'react-router-dom';
import s from './hr.module.scss';
import clsx from 'clsx';
import { useSchedules } from '../../../actions/schedules';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { StoreType } from '../../../redux/store';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

const errStyle = { minHeight: '100vh', display: 'grid', placeItems: 'center' };

const schema = Yup.object({
  departureDate: Yup.date()

    .min(
      moment().subtract(1, 'days').toDate(),
      'Today should be them minimum date',
    )
    .max(
      moment().add(10, 'days').toDate(),
      'Today should be them minimum date should be',
    )
    // .isValid()
    .required('Departure date is required'),

  returnDate: Yup.date()
    .min(moment().toDate(), 'Today should be them minimum date')
    .max(
      moment().add(10, 'days').toDate(),
      'Today should be them minimum date',
    ),
});

const Hero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const tripInfo = useSelector((state: StoreType) => state.search.tripInfo);

  const locationsQuery = useLocations();
  const {
    data: locations,
    isLoading: isLocationLoading,
    isFetching: isLocationFetching,
    error: locationError,
  } = locationsQuery;

  const busesQuery = useBuses();
  const {
    data: buses, // error: busesError,
    isLoading: isBusesLoading,
    isFetching: isBusFetching,
    error: busError,
  } = busesQuery;

  // console.log('buses :', buses);

  const schedulesQuery = useSchedules();
  const {
    isLoading: isSchedulesLoading,
    data,
    isSuccess,
    isFetching: isSchedulesFetching,
    error: scheduleError,
  } = schedulesQuery;

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: schema,
    initialValues: {
      notFound: '',
      twoWayTrip: false,
      bus: { label: '', id: '' },
      from: { label: '', id: '' },
      to: { label: '', id: '' }, // departureDate: moment().add(1, 'day').format('YYYY-MM-DD'),
      departureDate: '', // returnDate: moment().add(6, 'days').format('YYYY-MM-DD'),
      // returnDate: '2024-02-16',
      returnDate: '',
    },
    async onSubmit(values) {
      const tripInfo = {
        from: values.from,
        to: values.to,
        twoWayTrip: values.twoWayTrip,
        departureDate: values.departureDate,
        ...(values.twoWayTrip && { returnDate: values.returnDate }),
        bus: values.bus,
        invoker: 'hero',
        createdAt: moment().toDate().toString(),
      };

      // console.log('submit', tripInfo);

      dispatch(setTripInfo(tripInfo));
      setSubmitted(true);
    },
  });

  // console.log('formik.values :', formik);

  useLayoutEffect(() => {}, []);

  // error for bus
  useEffect(() => {
    if (busError && busesQuery.status === 'error') {
      formik.setFieldError('bus', 'Failed to fetch buses');
    } else {
      formik.setFieldError('bus', null);
    }
  }, [busError]);

  // error for location
  useEffect(() => {
    if (locationError && locationsQuery.status === 'error') {
      formik.setFieldError('from', 'Failed to fetch locations');
    } else {
      formik.setFieldError('from', null);
    }
  }, [busError]);

  // handle errors message for schedules
  useEffect(() => {
    if (tripInfo?.invoker !== 'hero') {
      return;
    }

    if (
      scheduleError &&
      !isSchedulesFetching &&
      !isSchedulesLoading &&
      schedulesQuery.status === 'error'
    ) {
      formik.setFieldError(
        'notFound',
        'Network fail, check your internet connection',
      );
    } else {
      formik.setFieldError('notFound', '');
    }
  }, [scheduleError]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // check and navigate
  useEffect(() => {
    if (!submitted || !isSuccess || isSchedulesLoading || isSchedulesFetching)
      return;

    if (
      tripInfo?.twoWayTrip &&
      (data?.firstTrip?.notFound || data?.secondTrip?.notFound)
    ) {
      formik.setFieldError('notFound', 'No bus found for the trip');
      setSubmitted(false);
      return;
    }

    if (data?.firstTrip?.notFound) {
      formik.setFieldError('notFound', 'No bus found for the trip');
      setSubmitted(false);
      return;
    }

    navigate('/booking');
  }, [schedulesQuery]);

  const onLocationSwap = () => {
    if (!formik.values.from || !formik.values.to) {
      //alert user to select location
      formik.setFieldError('from', 'Select location first');
      return;
    }

    const from = formik.values.from;
    formik.setFieldValue('from', formik.values.to);
    formik.setFieldValue('to', from);
  };

  return (
    <ErrorBoundary fallback={<h1 style={errStyle}>Something went wrong</h1>}>
      <div className={s.hr_container}>
        {/*<div className={clsx([s.bg, "bg-[url('/public/img/routes.png')]"])} />*/}
        <div className={clsx([s.bg2, "bg-[url('/public/img/bg2.jpg')]"])} />

        <motion.div className={s.wrapper} layout>
          <motion.div layout>
            <HeroHeader />
          </motion.div>

          <motion.form
            className={clsx([s.search_form, 'bg-amber-50'])}
            onSubmit={formik.handleSubmit}
            layout
          >
            <header>
              <FormControlLabel
                color="primary"
                control={
                  <Switch
                    name="twoWayTrip"
                    color="primary"
                    onChange={formik.handleChange}
                    value={formik.values.twoWayTrip}
                  />
                }
                label="Round trip"
              />

              <div className={s.bus_field}>
                <DirectionsBus color="disabled" />
                <Autocomplete
                  fullWidth
                  loading={isBusesLoading || isBusFetching}
                  options={buses || []}
                  value={formik.values.bus}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('bus', newValue);
                  }}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        src={`/buses2/${option.id}.jfif`}
                        alt="bus background"
                      />
                      {option.label}
                    </Box>
                  )}
                  renderInput={params => (
                    <TextField
                      {...params}
                      name="bus"
                      label="Favorite bus"
                      fullWidth
                      size="small"
                      error={Boolean(formik.errors.bus)}
                      helperText={formik.errors.bus as string}
                    />
                  )}
                />
              </div>
            </header>

            <Divider />

            <div className={s.booking_form_container}>
              <div className={s.booking_form}>
                <RadioButtonChecked />

                <Stack spacing={2} width="100%">
                  <div>
                    <Typography variant="h6" className={s.filed_title}>
                      Leaving from{' '}
                    </Typography>
                    <Typography variant="caption" color="gray">
                      where are you leaving?
                    </Typography>
                  </div>

                  <div className={s.filed_hor}>
                    <Autocomplete
                      fullWidth
                      // loading={true}
                      // getOptionLabel={constructLabel}
                      loading={isLocationLoading || isLocationFetching}
                      value={formik.values.from}
                      options={locations || []}
                      getOptionDisabled={option =>
                        option?.id === formik.values.to?.id
                      }
                      onChange={(event, newValue) => {
                        formik.setFieldValue('from', newValue);
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          name="from"
                          required
                          label="leaving from"
                          fullWidth
                          error={Boolean(formik.errors.from)}
                          helperText={formik.errors.from as string}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {isLocationLoading ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}
                        />
                      )}
                    />
                  </div>
                </Stack>
              </div>

              <div className={s.custom_divider}>
                <Divider
                  orientation="vertical"
                  className={clsx([s.hero_booking_divider, s.divider_custom])}
                />

                <IconButton
                  className={s.swap_location}
                  disabled={!formik.values.from || !formik.values.to}
                  onClick={onLocationSwap}
                >
                  <CompareArrows />
                </IconButton>
              </div>

              {/*<div className="ver">*/}
              <div className={s.booking_form}>
                {/*<LocationCity color="disabled" />*/}
                <LocationOn />

                <Stack spacing={2} width="100%">
                  <div>
                    <Typography variant="h6">Going to</Typography>
                    <Typography variant="caption" color="gray">
                      where are you going?
                    </Typography>
                  </div>

                  <div className={s.filed_hor}>
                    {/*<LocationOn />*/}
                    <Autocomplete
                      fullWidth
                      value={formik.values.to}
                      loading={isLocationLoading || isLocationFetching}
                      options={locations || []}
                      // getOptionLabel={constructLabel}
                      getOptionDisabled={option =>
                        option?.id === formik.values.from?.id
                      }
                      onChange={(event, newValue) => {
                        formik.setFieldValue('to', newValue);
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Going to"
                          fullWidth
                          required
                          error={Boolean(formik.errors.to)}
                          helperText={
                            formik.errors.to && (formik.errors.to as string)
                          }
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {isLocationLoading ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}
                        />
                      )}
                    />
                  </div>
                </Stack>
              </div>

              <Divider
                orientation="vertical"
                className={s.hero_booking_divider}
              />

              <div className={s.booking_form}>
                <CalendarMonth />

                <Stack spacing={2} width="100%">
                  <div>
                    <Typography variant="h6">Leaving on</Typography>
                    <Typography variant="caption" color="gray">
                      when are you going?
                    </Typography>
                  </div>

                  <Stack spacing={2}>
                    <DatePicker
                      disablePast
                      value={formik.values.departureDate}
                      minDate={moment().toDate()}
                      maxDate={moment().add(10, 'days').toDate()}
                      label="Leaving on"
                      // inputFormat="dd-m-yyyy"
                      onChange={date => {
                        // console.log( 'date: ', moment( date ).format( 'YYYY-MM-DD' ) );
                        formik.setFieldValue(
                          'departureDate',
                          moment(date).format('YYYY-MM-DD'),
                        );
                      }}
                      renderInput={params => (
                        <TextField
                          name="departureDate"
                          required
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="start">
                                <DateRangeSharp />
                              </InputAdornment>
                            ),
                          }}
                          {...params}
                          error={Boolean(formik.errors.departureDate)}
                          // helperText={formik.errors.departureDate}
                        />
                      )}
                    />

                    {formik.values.twoWayTrip && (
                      <DatePicker
                        label="Return Date"
                        // inputFormat="dd-mm-yyyy"
                        value={formik.values.returnDate}
                        minDate={moment(formik.values.departureDate)
                          .add(1, 'day')
                          .toDate()}
                        maxDate={moment(formik.values.departureDate)
                          .add(6, 'days')
                          .toDate()}
                        onChange={date => {
                          // make sure that return date is greater than departure date
                          if (
                            moment(date).isBefore(formik.values.departureDate)
                          ) {
                            formik.setFieldError(
                              'returnDate',
                              'return date must be greater than departure date',
                            );
                            return;
                          }

                          formik.setFieldValue(
                            'returnDate',
                            moment(date).format('YYYY-MM-DD'),
                          );
                        }}
                        renderInput={params => {
                          // console.log('params --- : ', params);
                          return (
                            <TextField
                              name="birthdate"
                              required
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <DateRangeSharp />
                                  </InputAdornment>
                                ),
                              }}
                              {...params}
                              // helperText={formik.errors.returnDate}
                              error={Boolean(formik.errors.returnDate)}
                            />
                          );
                        }}
                      />
                    )}
                  </Stack>
                </Stack>
              </div>
              {/*</div>*/}
            </div>

            <div className={s.control}>
              {
                <Chip
                  variant="outlined"
                  color="error"
                  className={clsx([
                    s.ss_err_msg,
                    formik.errors.notFound && s.visible,
                  ])}
                  label={formik.errors?.notFound as string}
                />
              }
              <LoadingButton
                variant="contained"
                size="large"
                loading={
                  //todo: better logic
                  // formik.isSubmitting ||
                  isLocationLoading ||
                  (isLocationFetching && buses?.length === 0) ||
                  isBusesLoading ||
                  (isBusFetching && buses?.length === 0) ||
                  isSchedulesFetching ||
                  (schedulesQuery.isLoading &&
                    schedulesQuery.fetchStatus !== 'idle')
                }
                endIcon={<Search fontSize="large" />}
                className={s.book_now_btn}
                type="submit"
              >
                <Typography variant="body1">Search</Typography>
              </LoadingButton>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </ErrorBoundary>
  );
};

export default Hero;
