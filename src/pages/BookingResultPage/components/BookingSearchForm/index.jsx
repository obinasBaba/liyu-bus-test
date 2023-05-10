import React, { useState } from 'react';
import {
  Autocomplete,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import {
  CalendarMonth,
  DateRangeSharp,
  LocationCity,
  Search,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { setRequest } from '../../../../redux/search';
import { setSchedules } from '../../../../redux/scheldule';
import { oneWayDummy } from '../../../../scenes/HomePage/Hero/util/dummy';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './bookingsearch.moudle.scss';

const BookingSearchForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request } = useSelector(state => state?.search);
  const { locations } = useSelector(state => state?.location);
  const { buses } = useSelector(state => state?.bus);

  const [locationOptions, setLocationOptions] = useState(locations);
  const [fromError, setFromError] = useState(null);

  const formik = useFormik({
    initialValues: {
      oneTimeTrip: false,
      bus: '',
      from: 'from',
      to: 'to',
      departureDate: new Date(),
      returnDate: new Date(),
    },
    async onSubmit(values) {
      console.log('submit', values);

      dispatch(
        setRequest({
          from: 'location2',
          to: 'location2',
          departureDate: '2015-06-23',
          oneTimeTrip: values.oneTimeTrip,
        }),
      );
      dispatch(setSchedules(oneWayDummy));

      // todo -> use the api data
    },
  });

  return (
    <div className="bsf_container">
      <form className="bsf_wrapper bg-amber-50" onSubmit={formik.handleSubmit}>
        <header>
          <Typography color="gray">
            Spend Your Vacation With our activities and places
          </Typography>
        </header>

        <Divider />

        <div className="booking_form_container">
          <div className="booking_form">
            <CalendarMonth color="disabled" />

            <div className="flex flex-col gap-4 w-full -mt-1">
              <div>
                <Typography variant="h6" className="font-extrabold">
                  Bus
                </Typography>
                <Typography variant="caption" color="gray">
                  What is your favorite bus to travel?
                </Typography>
              </div>

              <Autocomplete
                name="bus"
                options={buses}
                value={formik.values.bus}
                onChange={(event, newValue) => {
                  formik.setFieldValue('bus', newValue);
                }}
                renderInput={params => (
                  <TextField {...params} label="Favorite bus" fullWidth />
                )}
              />

              <FormControlLabel
                className="-mt-2"
                color="primary"
                control={
                  <Checkbox
                    name="oneTimeTrip"
                    color="primary"
                    onChange={formik.handleChange}
                    defaultValue={formik.values.oneTimeTrip}
                    value={formik.values.oneTimeTrip}
                  />
                }
                label="Two Way Trip"
              />
            </div>
          </div>

          <Divider orientation="vertical" className="hero_booking_divider" />

          {/*<div className="ver">*/}
          <div className="booking_form">
            <LocationCity color="disabled" />

            <div className="flex flex-col gap-4 w-full -mt-1">
              <div>
                <Typography variant="h6">Location</Typography>
                <Typography variant="caption" color="gray">
                  where are you going?
                </Typography>
              </div>

              <Autocomplete
                name="from"
                value={formik.values.from}
                options={locationOptions}
                onChange={(event, newValue) => {
                  formik.setFieldValue('from', newValue);
                }}
                renderInput={params => (
                  <TextField {...params} required label="From" fullWidth />
                )}
              />

              <Autocomplete
                name="to"
                value={formik.values.to}
                options={locationOptions}
                onChange={(event, newValue) => {
                  formik.setFieldValue('to', newValue);
                }}
                renderInput={params => (
                  <TextField {...params} label="To" fullWidth required />
                )}
              />
            </div>
          </div>

          <Divider orientation="vertical" className="hero_booking_divider" />

          <div className="booking_form">
            <CalendarMonth color="disabled" />

            <div className="flex flex-col gap-4 w-full -mt-1">
              <div>
                <Typography variant="h6">Schedule</Typography>
                <Typography variant="caption" color="gray">
                  when are you going?
                </Typography>
              </div>

              <DatePicker
                name="departureDate"
                value={formik.values.departureDate}
                label="Departure Date"
                onChange={date => {
                  // console.log( 'date: ', new Date(date).toLocaleDateString() );
                  formik.setFieldValue(
                    'departureDate',
                    new Date(date).toLocaleDateString(),
                  );
                }}
                renderInput={params => (
                  <TextField
                    name="departureDate"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DateRangeSharp />
                        </InputAdornment>
                      ),
                    }}
                    {...params}
                  />
                )}
              />

              {formik.values.oneTimeTrip && (
                <DatePicker
                  label="Return Date"
                  name="returnDate"
                  value={formik.values.returnDate}
                  onChange={date => {
                    // console.log( 'date: ', new Date(date).toLocaleDateString() );
                    formik.setFieldValue(
                      'returnDate',
                      new Date(date).toLocaleDateString(),
                    );
                  }}
                  renderInput={params => (
                    <TextField
                      name="birthdate"
                      required
                      // error={Boolean(formic.errors.date_of_commencement)}
                      // helperText={formic.errors.date_of_commencement}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DateRangeSharp />
                          </InputAdornment>
                        ),
                      }}
                      {...params}
                    />
                  )}
                />
              )}

              {/*<FormControlLabel className='-mt-2' control={<Checkbox sx={{ color: '#e74f00' }}/>}
                                                  label='One Way Trip'/>*/}
            </div>
          </div>
          {/*</div>*/}
        </div>

        <LoadingButton
          variant="contained"
          size="large"
          loading={formik.isSubmitting}
          endIcon={<Search />}
          className="book_now_btn"
          type="submit"
        >
          <Typography variant="h6">Search</Typography>
        </LoadingButton>
      </form>
    </div>
  );
};

export default BookingSearchForm;
