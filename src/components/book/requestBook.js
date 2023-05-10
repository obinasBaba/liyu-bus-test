import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { useDispatch, useSelector } from 'react-redux';

import Toggle from '../form/toggle';
import PrimaryButton from '../button/primaryButton';
import InputAmharicDate from '../form/inputsAmharicDate';
import { getRoundTripSchedules, getSchedules } from '../../actions/schedules';

const RequestBook = ({ showTopSection }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { request } = useSelector(state => state?.search);
  const { locations } = useSelector(state => state?.location);
  const { buses } = useSelector(state => state?.bus);

  const [bus, setBus] = useState(request?.bus);
  const [departureDate, setDepartureDate] = useState(request?.departureDate);
  const [returnDate, setReturnDate] = useState(request?.returnDate);
  const [to, setTo] = useState(request?.to);
  const [from, setFrom] = useState(request?.from);

  const [locationOptions, setLocationOptions] = useState(locations);
  const [departureDateError, setDepartureDateError] = useState(null);
  const [returnDateError, setreturnDateError] = useState(null);
  const [oneTimeTrip, setOneTimeTrip] = useState(
    request ? request.oneTimeTrip : true,
  );
  const [fromError, setFromError] = useState(null);
  const [toError, setToError] = useState(null);

  useEffect(() => {
    const dateChangeListener = e => {
      const data = e.detail.data.split(',');

      if (data[0] === 'departureDate') {
        setDepartureDate(data[1]);
      } else if (data[0] === 'returnDate') {
        setReturnDate(data[1]);
      }
    };

    window.addEventListener('dateValueChanged', dateChangeListener, true);
  }, []);

  useEffect(() => {
    setLocationOptions(locations);
  }, [locations]);

  const validateInputs = () => {
    const dateError = new Date(departureDate) > new Date(returnDate);
    if (!from) {
      setFromError('Required');
    }
    if (!to) {
      setToError('Required');
    }

    if (!departureDate) {
      setDepartureDateError('Required');
    }

    if (!oneTimeTrip && dateError) {
      setreturnDateError('Return Date can not be less than departure date');
    }

    if (from && to && departureDate) {
      if (!oneTimeTrip && dateError) {
        return false;
      } else return true;
    }
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('handle submit');

    const isCorrect = validateInputs();
    if (isCorrect) {
      const splitedDepartureDate = departureDate.split('/');
      const splitedReturnDate = returnDate?.split('/');

      const updatedDepDate = `${splitedDepartureDate[2]}-${splitedDepartureDate[1]}-${splitedDepartureDate[0]}`;

      const sentRequest = {
        from,
        to,
        departureDate: updatedDepDate,
        bus,
        oneTimeTrip,
      };

      if (returnDate) {
        sentRequest[
          'returnDate'
        ] = `${splitedReturnDate[2]}-${splitedReturnDate[1]}-${splitedReturnDate[0]}`;
      }

      // return console.log('sent request : ', sentRequest)

      if (oneTimeTrip) getSchedules(dispatch, sentRequest, navigate);
      else getRoundTripSchedules(dispatch, sentRequest, navigate);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {showTopSection && (
        <div className="w-3/4 mt-6">
          <div className="flex flex-col w-full text-left">
            <h2 className="text-white text-3xl font-bold">
              Save Money and Time
            </h2>
            <h4 className="text-white my-3">Reserve Your Seat Now</h4>
          </div>
        </div>
      )}
      <form className="w-3/4 flex flex-col" onSubmit={handleSubmit}>
        <div
          className={`flex space-x-5 my-3 ${
            showTopSection ? 'order-2' : 'order-1'
          }`}
        >
          <Toggle
            name="oneTimeTrip"
            label="One Way Trip"
            onChange={() => {
              setOneTimeTrip(!oneTimeTrip);
            }}
            defaultChecked={oneTimeTrip === true}
          />
          <Toggle
            name="twoTimeTrip"
            label="Two Way Trip"
            onChange={() => {
              setOneTimeTrip(!oneTimeTrip);
            }}
            defaultChecked={oneTimeTrip === false}
            value={false}
          />
        </div>
        <div
          className={`flex flex-col ${showTopSection ? 'order-1' : 'order-2'}`}
        >
          <div className="w-full text-white text-left text-sm mb-2">
            <label>Choose Your Favourite Bus </label>
            <span className="text-[#FF6B1B] font-bold">(Optional)</span>
          </div>

          <div className="mb-5">
            <Autocomplete
              disablePortal
              id="bus"
              options={['buses', 'buses1']}
              name="bus"
              size="small"
              sx={{ width: 300, background: 'white' }}
              className="rounded"
              value={bus}
              onChange={(event, newValue) => {
                setBus(newValue);
              }}
              renderInput={params => <TextField {...params} label="Bus Name" />}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="w-full flex flex-col space-y-2 md:space-y-0 lg:flex-row order-3">
          <div className="flex flex-col items-start space-y-5 md:space-y-0 justify-start ">
            <div className="flex flex-col items-center md:items-start md:flex-row md:mb-5">
              <div className={``}>
                <Autocomplete
                  disablePortal
                  id="from"
                  options={locationOptions}
                  name="from"
                  sx={{ width: 300, background: 'white' }}
                  className="rounded"
                  value={from}
                  error={fromError}
                  onChange={(event, newValue) => {
                    setFrom(newValue);
                  }}
                  size="small"
                  renderInput={params => <TextField {...params} label="From" />}
                />
                {fromError && (
                  <p style={{ color: 'red' }} className="p-2.5 py-2 font-light">
                    {fromError}
                  </p>
                )}
              </div>
              <ShuffleIcon
                sx={{
                  color: '#FF6B1B',
                  fontSize: '40px',
                  cursor: 'pointer',
                }}
                className=" mx-3"
                onClick={() => {
                  setTo(from);
                  setFrom(to);
                }}
              />
              <div className={``}>
                <Autocomplete
                  disablePortal
                  id="to"
                  options={locationOptions}
                  name="to"
                  sx={{ width: 300, background: 'white' }}
                  className="rounded"
                  value={to}
                  error={toError}
                  onChange={(event, newValue) => {
                    setTo(newValue);
                  }}
                  size="small"
                  renderInput={params => <TextField {...params} label="To" />}
                />
                {toError && (
                  <p style={{ color: 'red' }} className="p-2.5 py-2 font-light">
                    {toError}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between md:mb-5">
              <div className="">
                <InputAmharicDate
                  label="Departure Date"
                  name="departureDate"
                  type="text"
                  useMaterialInput={true}
                  value={departureDate}
                />
                {departureDateError && (
                  <p style={{ color: 'red' }} className="p-2.5 py-2 font-light">
                    {departureDateError}
                  </p>
                )}
              </div>
              <div className=" mx-3"></div>
              {!oneTimeTrip && (
                <div className="flex flex-col">
                  <InputAmharicDate
                    label="Return Date"
                    name="returnDate"
                    type="text"
                    useMaterialInput={true}
                    value={returnDate}
                  />
                  {returnDateError && (
                    <p
                      style={{ color: 'red' }}
                      className="p-2.5 py-2 font-light"
                    >
                      {returnDateError}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="grow lg:ml-6 flex items-start justify-start lg:justify-center">
            <PrimaryButton
              label={'Search'}
              type="submit"
              className="w-full w-1/2"
              // onClick={handleSubmit}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RequestBook;
