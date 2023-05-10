import { useEffect, useRef, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';

const PassengerInfo = ({
  setPassengersDetails,
  passengersDetails,
  index,
  seatNumber,
}) => {
  const [state, setState] = useState({
    passengerName: '',
    phoneNumber: '',
    age: null,
    gender: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const passengerNameRef = useRef();
  const phoneNumberRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const initailState = {
      passengerName: '',
      phoneNumber: '',
      age: null,
      gender: '',
    };
    if (JSON.stringify(state) !== JSON.stringify(initailState))
      validateAndSubmit();
  }, [state]);

  const validateInput = async () => {
    const fields = [
      {
        name: 'passengerName',
        value: state.passengerName,
        message: 'Passenger Name address should not be blank.',
      },
      {
        name: 'phoneNumber',
        value: state.phoneNumber,
        message: 'Phone Number should not be blank.',
      },
      {
        name: 'age',
        value: state.age,
        message: 'Age should not be blank.',
      },
      {
        name: 'gender',
        value: state.gender,
        message: 'Gender should not be blank.',
      },
    ];

    let isNotFilled = false;

    return new Promise(async (resolve, reject) => {
      await Promise.all(
        fields.map(field => {
          if (field.value || field.value === 0) {
            if (field.name === 'gender') {
              isNotFilled = false;
              setErrorMsg('');
            } else {
              if (field.value.trim() === '') {
                isNotFilled = true;
                setErrorMsg(field.message);
              } else {
                isNotFilled = false;
                setErrorMsg('');
              }
            }
          } else {
            isNotFilled = true;
            setErrorMsg(field.message);
          }
        }),
      );

      resolve(isNotFilled);
    });
  };

  const onSubmit = () => {
    let updatedArray = passengersDetails;

    const passenger = {
      seatNumber: seatNumber,
      passenger: {
        fullName: state.passengerName,
        gender: state.gender,
        age: state.age,
        phoneNumber: state.phoneNumber,
      },
    };

    if (updatedArray[index] === null) {
      updatedArray.push(passenger);
    } else {
      updatedArray[index] = passenger;
    }

    setPassengersDetails(updatedArray);
  };

  const validateAndSubmit = async () => {
    const isInvalid = await validateInput();
    if (!isInvalid) {
      onSubmit();
    }
  };

  return (
    <form className="w-full">
      <Typography>{`Seat ${seatNumber} ${
        index === 0 ? '(Main passenger)' : ''
      }`}</Typography>
      <div className="w-full h-full flex space-x-1 items-start py-2">
        <div className="grow text-left">
          <TextField
            label={'Passenger Name'}
            required
            name="passengerName"
            onChange={handleInputChange}
            value={state.passengerName}
            width="full"
            inputClassName=""
            useMaterialInput={true}
            ref={passengerNameRef}
          />
        </div>
        <div className="grow text-left">
          <TextField
            label={'Phone'}
            required
            name="phoneNumber"
            onChange={handleInputChange}
            value={state.phoneNumber}
            inputClassName=""
            width="full"
            useMaterialInput={true}
            prefix={'+251'}
            type="tel"
            ref={phoneNumberRef}
          />
        </div>
        <div className="grow flex space-x-1">
          <div className="w-1/2">
            <TextField
              required
              label="Age"
              name="age"
              onChange={handleInputChange}
              value={state.age}
              width="full"
              inputClassName=""
              useMaterialInput={true}
              type="number"
              ref={ageRef}
            />
          </div>
          <div className="w-1/2">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.gender}
                // label="Gender"
                onChange={handleInputChange}
                ref={genderRef}
              >
                {[
                  {
                    value: '',
                    label: '',
                  },
                  {
                    value: 1,
                    label: 'Male',
                  },
                  {
                    value: 0,
                    label: 'Female',
                  },
                ].map((item, index) => (
                  <MenuItem value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/*<Select
              name="gender"
              label="Gender"
              onChange={handleInputChange}
              options={[
                {
                  value: "",
                  label: "",
                },
                {
                  value: 1,
                  label: "Male",
                },
                {
                  value: 0,
                  label: "Female",
                },
              ]}
              value={state.gender}
              ref={genderRef}
            />*/}
          </div>
        </div>
      </div>
    </form>
  );
};

export default PassengerInfo;
