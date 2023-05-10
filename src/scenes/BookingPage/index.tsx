import React, {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import ScheduleList from './ScheduleList';
import TravelDetail from './TravelDetail';
import { motion } from 'framer-motion';
import { Form, Formik } from 'formik';
import Checkout from './Checkout';
import { StoreType } from '../../redux/store';
import s from './booking.module.scss';
import clsx from 'clsx';
import {
  BookingStepFormValue,
  FormStepsContextType,
  TripStepName,
} from './types';
import ErrorBoundary from '../../components/ErrorBoundary';
import { ArrowBack, ArrowForward, BookmarkAdd } from '@mui/icons-material';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { Alert, LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { matchIsValidTel } from 'mui-tel-input';
import { useSchedules } from '../../actions/schedules';
import { Navigate, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { setBookingDetail } from '../../redux/booking';
import { mutationFn } from '../../actions/bookings';
import appRoutes from '../../utils/routes';

export const tripSteps = [
  {
    idx: 0,
    name: TripStepName.Departure,
    completed: false,
    components: (props: any) => <ScheduleList {...props} />,
    props: {
      travelType: 'DEPARTURE',
      seatSelectionType: 'mainTravel',
    },
  },
  {
    idx: 1,
    name: TripStepName.Return,
    completed: false,
    components: (props: any) => <ScheduleList {...props} />,
    props: {
      travelType: 'RETURN',
      seatSelectionType: 'returnTravel',
    },
  },
  {
    idx: 2,
    name: TripStepName.PassengersDetail,
    completed: false,
    components: (props: any) => <TravelDetail {...props} />,
    props: {},
  },

  {
    idx: 3,
    name: TripStepName.Checkout,
    completed: false,
    components: (props: any) => <Checkout {...props} />,
    props: {},
  } /*{
    idx: 4,
    name: TripStepName.Payment,
    completed: false,
    components: (props: any) => <Payment {...props} />,
    props: {},
  },*/,
];

const formikInitial = {
  showModal: false,
  travelDetail: {
    mainTravel: {
      // schedule: 'b6ef93ab-80cf-481b-8a53-30484c66ba93',
      // selectedSeats: [22],
      schedule: '',
      selectedSeats: [],
      boardingPoint: '',
      dropOffPoint: '',
    },

    /* mainTravel: {
       schedule: '897e8fa1-630a-43ed-882d-542361921c0c',
       selectedSeats: [11],
       boardingPoint: '5de5a091-2aa2-4f9e-af31-5776a99b3f70',
       dropOffPoint: 'e64d7ba2-801f-4f2c-8824-7aa6075f76f4',
     },
 */
    returnTravel: {
      schedule: '',
      selectedSeats: [],
      boardingPoint: '',
      dropOffPoint: '',
    },
  },
  passengersDetails: [
    /* {
      fullName: 'henok',
      phone: 92334444,
      age: 23,
      gendar: 'MALE',
    },*/
  ],
};

const FormStepsContext = createContext<FormStepsContextType>({
  seatSelectionType: 'mainTravel',
  prevStep: () => null,
  nextStep: () => null,
  activeStep: tripSteps[0],
});

const formSchema = Yup.object({
  travelDetail: Yup.object({
    /* returnTravel: Yup.object({
       // schedule: Yup.string().required('Schedule is required'),
       selectedSeats: Yup.array()
         .of(Yup.number().integer())
         .min(1, 'At least one seat must be selected')
         .required('Seats are required'),
     }),*/
  }),
  passengersDetails: Yup.array().of(
    Yup.object({
      firstName: Yup.string()
        .required('First name is required')
        .min(3, 'first name must be at least 3 characters')
        .max(13, 'first name can not be more than 13 characters')
        .matches(/^[a-zA-Z]+$/, 'First name must be only letters'),
      lastName: Yup.string()
        .required('Last name is required')
        .min(3, 'last name must be at least 3 characters')
        .max(13, 'first name can not be more than 13 characters')
        .matches(/^[a-zA-Z]+$/, 'First name must be only letters'),
      phone: Yup.number().required('Phone is required').integer(),
      age: Yup.number()
        .required('Age is required')
        .positive('Age must be positive')
        .integer('Age must be an integer')
        .max(115, 'Age must be less than 115'),
      gender: Yup.string().required('Gender is required'),
    }),
  ),
});

export const useFormStepContext = () => {
  const stepContextValues = useContext(FormStepsContext);
  if (stepContextValues === undefined) {
    throw new Error('useFOrmStepContext was used outside of its Provider');
  }
  return stepContextValues as FormStepsContextType;
};

/*
* {
  "scheduleUUId": "string",
  "roundTripScheduleUUId": "string",
  "onBoardingUUId": "string",
  "offBoardingUUId": "string",
  "roundTripOnBoardingUUId": "string",
  "roundTripOffBoardingUUId": "string",
  "bookingDetails": [
    {
      "seatNumber": "string",
      "roundTripSeatNumber": "string",
      "passenger": {
        "phoneNumber": "string",
        "fullName": "string",
        "age": 0,
        "gender": "FEMALE"
      }
    }
  ],
  "isRoundTrip": true
}
* */

const BookingPage = () => {
  const dispatch = useDispatch();
  const [steps, setSteps] = useState(tripSteps);
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();
  const tripInfo = useSelector((state: StoreType) => state.search.tripInfo);
  const [activeStep, setActiveStep] = useState<typeof steps[number]>({
    ...steps[idx],
  });

  const schedule = useSchedules();

  const bookSeats = useMutation({
    mutationFn,
    async onSuccess(bookingResponse) {
      console.log('booked-data: ', bookingResponse);
      dispatch(
        setBookingDetail({
          createdAt: moment().toDate().toString(),
          bookingUUIds: bookingResponse.data.bookingUUIds,
        }),
      );

      toast.success('Booking successful, Proceed to payment');
      await schedule.refetch();
      navigate(appRoutes.PAYMENT);
    },
    onError(err) {
      console.log('err: ', err);
      toast.error('Something went wrong,try again later');
    },
  });

  const prevStep = () => {
    console.log('prevStep ;', idx);
    setIdx(idx - 1);
  };

  const nextStep = arg => {
    console.log('next step', arg);
    if (!arg) return;
    setIdx(idx + 1);
  };

  useEffect(() => {
    // set completed to true
    setActiveStep({ ...steps[idx], completed: true });
  }, [idx, steps]);

  useLayoutEffect(() => {
    // if one way trip, remove the return date step

    if (!tripInfo?.twoWayTrip) {
      const newSteps = tripSteps
        .filter(step => step.props.seatSelectionType !== 'returnTravel')
        .map((step, idx) => ({ ...step, idx }));

      setSteps(newSteps);
      console.log('newSteps', newSteps, tripInfo);
    }
  }, [tripInfo]);

  // console.log('tripInfo -------------', tripInfo);

  if (!tripInfo || !tripInfo?.createdAt) {
    return <Navigate to="/" replace />;
  }

  const tripInfoCreatedAt = moment(tripInfo?.createdAt);

  if (
    moment().diff(tripInfoCreatedAt, 'hour') > 1 &&
    tripInfo.invoker !== 'active-trips'
  ) {
    console.log('going back----------');
    return <Navigate to="/" replace />;
  }

  return (
    <div className={s.bp_container}>
      <div className={clsx([s.bg, "bg-[url('/public/img/paths.png')]"])} />

      <div className={s.bp_wrapper}>
        <Stepper
          activeStep={activeStep.idx}
          alternativeLabel
          orientation="horizontal"
          className={s.bp_stepper}
        >
          {steps.map(({ name, completed }, idx) => (
            <Step key={name} completed={idx < activeStep.idx}>
              <StepLabel>
                <Typography
                  variant="h6"
                  color={
                    idx < activeStep.idx || idx === activeStep.idx
                      ? 'primary'
                      : 'gray'
                  }
                  sx={{ fontWeight: '600' }}
                >
                  {name}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Formik
          validateOnMount={false}
          validateOnChange={true}
          validateOnBlur={true}
          enableReinitialize
          validationSchema={formSchema}
          initialValues={formikInitial as BookingStepFormValue}
          onSubmit={(values, formikHelpers) => {
            console.log('onsubmit: ', values);

            switch (activeStep.name) {
              case TripStepName.Departure:
                // console.log('departure date', values);
                if (values.travelDetail.mainTravel.selectedSeats.length === 0) {
                  formikHelpers.setFieldError(
                    'seatError',
                    'Please select at least one seat',
                  );
                  return;
                }

                break;
              case TripStepName.Return:
                // console.log('return date', values);
                if (
                  values.travelDetail.returnTravel.selectedSeats.length === 0
                ) {
                  formikHelpers.setFieldError(
                    'seatError',
                    'Please select at least one seat for return trip',
                  );
                  return;
                }

                if (
                  values.travelDetail.returnTravel.selectedSeats.length === 0 ||
                  values.travelDetail.returnTravel.selectedSeats.length !==
                    values.travelDetail.mainTravel.selectedSeats.length
                ) {
                  formikHelpers.setFieldError(
                    'seatError',
                    'The return seat is not equal to main travel seat',
                  );
                  return;
                }

                break;
              case TripStepName.PassengersDetail:
                console.log('passengers detail', values);
                // check the phone number validity
                const phoneValid = values.passengersDetails.every(passenger => {
                  return matchIsValidTel(passenger.phone);
                });

                if (!phoneValid) {
                  return;
                }

                // check the for at least one adult
                const adultExist = values.passengersDetails.some(passenger => {
                  return passenger.age >= 18;
                });

                if (!adultExist) {
                  formikHelpers.setFieldError(
                    'passengersError',
                    'At least one passenger must be greater than or equal to 18 years old.',
                  );
                  return;
                }

                break;
              case TripStepName.Checkout:
                console.log('checkout', values);

                const bookingDetails: any = (
                  values as BookingStepFormValue
                ).travelDetail.mainTravel.selectedSeats.map((seat, idx) => ({
                  seatNumber: seat,
                  roundTripSeatNumber: tripInfo.twoWayTrip
                    ? values.travelDetail.returnTravel.selectedSeats[idx]
                    : null,
                  passenger: {
                    age: values.passengersDetails[idx].age,
                    phoneNumber: values.passengersDetails[idx].phone
                      ?.replaceAll(' ', '')
                      .replace('0', ''),

                    fullName: `${values.passengersDetails[idx].firstName} ${values.passengersDetails[idx].lastName}`,
                    gender:
                      values.passengersDetails[idx].gender === 'FEMALE' ? 0 : 1,
                  },
                }));

                // replace 0 or space with empty string
                ''.replace(/0| /g, '');

                console.log('bookdetial: -----', bookingDetails);

                bookSeats.mutate(
                  {
                    scheduleUUId: values.travelDetail.mainTravel.schedule, // bookingDetails
                    isRoundTrip: tripInfo.twoWayTrip,
                    offBoardingUUId:
                      values.travelDetail.mainTravel.boardingPoint,
                    onBoardingUUId: values.travelDetail.mainTravel.dropOffPoint,
                    bookingDetails: bookingDetails,
                    ...(tripInfo.twoWayTrip && {
                      roundTripScheduleUUId:
                        values.travelDetail.returnTravel.schedule,
                      roundTripOnBoardingUUId:
                        values.travelDetail.returnTravel.boardingPoint,
                      roundTripOffBoardingUUId:
                        values.travelDetail.returnTravel.dropOffPoint,
                    }),
                  },
                  {
                    onError(err) {
                      formikHelpers.setFieldError(
                        'bookingError',
                        'Your bus booking was not successful. Kindly make your booking again after a while.',
                      );
                    },
                  },
                );

                // setIdx(idx + 1);
                return;

              // break;

              case TripStepName.Payment:
                console.log('Payment', values);
                navigate(appRoutes.PAYMENT);

                // book the trip

                break;
              default:
                break;
            }

            // if ( !values ) return;

            if (activeStep.name !== TripStepName.Payment) setIdx(idx + 1);

            return null;
          }}
          // validationSchema={activeStep.schema}
        >
          {props => {
            // console.log('formikProps', props);

            return (
              <Form>
                <FormStepsContext.Provider
                  value={{
                    ...(activeStep.props as any),
                    activeStep,
                    prevStep,
                    nextStep,
                  }}
                >
                  <ErrorBoundary fallback={<div>Something went wrong</div>}>
                    <React.Fragment key={activeStep.name}>
                      <Alert severity="error" className={s.error_alert}>
                        <Typography>
                          Please fix the errors below before going back to the
                          previous step
                        </Typography>
                      </Alert>

                      <Fragment key={activeStep.idx}>
                        {activeStep.components({
                          ...activeStep.props,
                        })}
                      </Fragment>
                    </React.Fragment>
                  </ErrorBoundary>
                </FormStepsContext.Provider>

                <motion.div
                  className={clsx([
                    s.control_btn,
                    `${
                      activeStep.idx === 0 ||
                      (activeStep.name === TripStepName.Return && s.btn_hide)
                    }`,
                  ])}
                >
                  {idx !== 0 && activeStep.name !== 'Payment' && (
                    <LoadingButton
                      variant="contained"
                      className="in_btn"
                      size="large"
                      color="secondary"
                      fullWidth
                      startIcon={<ArrowBack />}
                      onClick={() => {
                        console.log('props: ', props);
                        if (props.errors.passengersDetails) return;

                        prevStep();
                      }}
                      disabled={bookSeats.isLoading}
                    >
                      Back
                    </LoadingButton>
                  )}

                  <LoadingButton
                    variant="contained"
                    size="large"
                    fullWidth
                    className={clsx([{ [s.alone]: idx === 0 }])}
                    type="submit"
                    loading={bookSeats.isLoading}
                    endIcon={
                      activeStep.name !== TripStepName.Payment ? (
                        <ArrowForward />
                      ) : (
                        <BookmarkAdd />
                      )
                    }
                  >
                    {activeStep.name === TripStepName.Payment
                      ? 'Proceed To Pay'
                      : activeStep.name === TripStepName['Checkout']
                      ? 'Book'
                      : 'Continue'}
                  </LoadingButton>
                </motion.div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default BookingPage;
