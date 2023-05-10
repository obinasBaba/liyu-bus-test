import { useEffect, useRef } from 'react';
import {
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useFormikContext } from 'formik';
import {
  AirportShuttle,
  Person,
  Phone,
  SensorOccupied,
} from '@mui/icons-material';
import { BookingStepFormValue } from '../types';
import { matchIsValidTel, MuiTelInput } from 'mui-tel-input';

const genders = ['Male', 'Female'];

const PassengerInfo = ({
  setPassengersDetails,
  passengersDetails,
  index,
  seatNumber,
  returnSeatNumber,
}) => {
  const passengerNameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();

  const formik = useFormikContext<BookingStepFormValue>();
  const { values, handleChange, errors } = formik;

  useEffect(() => {
    // scroll to the top of the document
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full mb-3">
      <div className="flex items-center gap-3 mb-1">
        <Chip
          label={`Seat ${seatNumber}`}
          icon={<AirportShuttle color="primary" />}
        />

        {returnSeatNumber && (
          <Chip
            label={`Seat ${returnSeatNumber}`}
            icon={
              <AirportShuttle
                color="primary"
                sx={{ transform: 'scale(-1,1)' }}
              />
            }
          />
        )}

        {index === 0 && (
          <Chip label="Main Passenger" variant="outlined" color="primary" />
        )}
      </div>

      <div className="w-full h-full flex gap-7 sm:gap-3 space-x-1 items-start py-2 flex-wrap mt-4 sm:mt-0 sm:flex-nowrap">
        <div className="grow text-left">
          <TextField
            required
            label={'First Name'}
            name={`passengersDetails[${index}].firstName`}
            onChange={handleChange}
            value={values.passengersDetails[index]?.firstName}
            ref={passengerNameRef}
            error={Boolean(
              Array.isArray(errors.passengersDetails) &&
                (errors.passengersDetails[index] as any)?.firstName,
            )}
            helperText={
              (
                errors.passengersDetails &&
                (errors.passengersDetails[index] as any)
              )?.firstName as string
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="grow text-left">
          <TextField
            required
            label={'Last Name'}
            name={`passengersDetails[${index}].lastName`}
            onChange={handleChange}
            value={values.passengersDetails[index]?.lastName}
            error={Boolean(
              Array.isArray(errors.passengersDetails) &&
                (errors.passengersDetails[index] as any)?.lastName,
            )}
            helperText={
              (
                errors.passengersDetails &&
                (errors.passengersDetails[index] as any)
              )?.lastName as string
            }
            ref={passengerNameRef}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="grow text-left">
          <MuiTelInput
            label="phone no"
            name={`passengersDetails[${index}].phone`}
            placeholder={Array(15).fill('_').join(' ')}
            value={formik.values.passengersDetails[index]?.phone}
            onlyCountries={['ET']}
            defaultCountry="ET"
            required
            fullWidth
            forceCallingCode
            focusOnSelectCountry
            onChange={(value, info) => {
              console.log('value: ', info);

              formik.setFieldValue(`passengersDetails[${index}].phone`, value);
            }}
            error={Boolean(
              values.passengersDetails[index]?.phone &&
                !matchIsValidTel(values.passengersDetails[index]?.phone),
            )}
            helperText={
              Boolean(
                values.passengersDetails[index]?.phone &&
                  !matchIsValidTel(values.passengersDetails[index]?.phone),
              )
                ? 'phone number is invalid'
                : ''
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="w-full sm:w-max flex gap-4">
          <div className="w-full">
            <TextField
              required
              label="Age"
              name={`passengersDetails[${index}].age`}
              onChange={handleChange}
              value={values.passengersDetails[index]?.age}
              error={
                (
                  formik.errors?.passengersDetails?.length > 0 &&
                  formik.errors?.passengersDetails &&
                  (formik.errors?.passengersDetails[index] as any)
                )?.age
              }
              helperText={
                (
                  formik.errors?.passengersDetails?.length > 0 &&
                  (formik.errors?.passengersDetails[index] as any)
                )?.age
              }
              type="number"
              ref={ageRef}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SensorOccupied />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="w-full">
            <FormControl
              required
              fullWidth
            >
              <InputLabel sx={{ backgroundColor: 'white', padding: '0 .2rem' }}>
                Gender
              </InputLabel>
              <Select
                required
                name={`passengersDetails[${index}].gender`}
                onChange={handleChange}
                value={values.passengersDetails[index]?.gender}
                ref={genderRef}
              >
                {genders.map(gender => (
                  <MenuItem key={gender} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;
