import React, { useEffect, useLayoutEffect, useState } from 'react';
import s from './registrationmodal.module.scss';

import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  MotionConfig,
  useAnimation,
  Variants,
} from 'framer-motion';
import { basicVariants, MotionParent } from '../../../components/MotionItems';
import { useFormik } from 'formik';
import SignupBg from './img.png';
import { Img } from 'react-image';
import { useAppContext } from '../../../components/context/AppContext';
import Typography from '@mui/material/Typography';
import { matchIsValidTel, MuiTelInput } from 'mui-tel-input';
import {
  Password,
  Person,
  Phone,
  SensorOccupied,
  Visibility,
} from '@mui/icons-material';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { mutationFn } from '../../../actions/auth';

const imgVariant = {
  initial: {
    opacity: 0,
  },

  exit: {
    opacity: 0,
  },
};
const signOutVariant = {
  initial: {
    opacity: 0,
  },
  signIn: {
    opacity: 0,
  },
  signUp: {
    opacity: 1,
  },
};

const text: Variants = {
  initial: {
    opacity: 0,
  },
  signIn: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 1.4,
      ease: [0.165, 0.84, 0.44, 1],
    },
  },

  signUp: {
    opacity: 0,
    transition: {
      duration: 0.7,
      ease: [0.165, 0.84, 0.44, 1],
    },
  },
};

const registrationModalVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
  },
};

const transition = {
  duration: 1,
  ease: [0.6, 0.01, 0, 0.9],
};

export const blurVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
    transition: {
      delay: 0.3,
      duration: 1.2,
      ease: [0.6, 0.01, 0, 0.9],
    },
  },
};

const blurTransition = {
  duration: 1.2,
  ease: [0.165, 0.84, 0.44, 1],
};

// temp fix fro user-session
const useSession = () => {
  return {
    data: {
      user: {
        email: '',
      },
      expires: '',
    },
  };
};

function CloseButton(props: { onClick: () => void }) {
  return (
    <IconButton
      aria-label="close menu"
      className="close_cross"
      type="button"
      onClick={props.onClick}
    >
      <svg width={'100%'} height="100%" viewBox="0 0 87 87">
        <g stroke="gray" strokeWidth="8" fill="none" fillRule="evenodd">
          <path className="_1s9fS" d="M4.5 3.5l39.573 39.573"></path>
          <path className="_1s9fS" d="M83.5 3.5L44.073 43.073"></path>
          <path className="_1s9fS" d="M83.5 82.5L44.073 43.073"></path>
          <path className="_1s9fS" d="M4.5 82.5l39.573-39.427"></path>
        </g>
      </svg>
    </IconButton>
  );
}

const yupSchema = Yup.object({
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
  phone: Yup.number()
    .required('Phone is required')
    .integer() /* password: Yup.string()
    .required('password is required')
    .min(8, 'password must be at least 3 characters')
    .max(10, 'password can not be more than 13 characters'),*/ /*confirmPassword: Yup.string()
    .required('password is required')
    .min(8, 'password must be at least 3 characters')
    .max(10, 'password can not be more than 13 characters'),*/,
});

const RegistrationModal = () => {
  const [signUp, setSignUp] = useState<boolean>(false);
  const [validationSchema, setValidationSchema] = useState<any>({});
  const [values, setValues] = useState<any>({
    email: null,
    password: null,
  });

  const { setShowAuthModal: showModal } = useAppContext();
  const { data: session } = useSession();
  const control = useAnimation();

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const auth = useMutation({
    mutationFn,
    async onSuccess(signInResponse) {
      console.log('signInResponse : ', signInResponse);
    },
    onError(err) {
      console.log('err: ', err);
      toast.error('Something went wrong,try again later');
    },
  });

  useEffect(() => {
    if (signUp) {
      setValidationSchema(yupSchema);
    } else {
      setValidationSchema(yupSchema.omit(['firstName', 'lastName']));
    }
  }, [signUp]);

  const formik = useFormik({
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    validateOnMount: false,
    initialValues: {
      phone: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
    },
    onSubmit(value) {
      auth.mutate({
        password: value.password,
        fullName: `${value.firstName} ${value.lastName}`,
        phoneNumber: value.phone,
        age: Number(value.age),
        gender: value.gender,
      });
    },
  });

  useLayoutEffect(() => {
    if (signUp) {
      control.start('signUp');
    } else {
      control.start('signIn');
    }
  }, [signUp, control]);

  return (
    <MotionParent className={s.container} variants={{}}>
      <motion.div
        variants={basicVariants}
        transition={blurTransition}
        className="blur"
        onClick={() => showModal(false)}
      />

      <LayoutGroup id="wrap" inherit={false}>
        <motion.div
          variants={registrationModalVariants}
          transition={transition}
          className="signup_wrapper signin"
          layout
        >
          <CloseButton
            onClick={() => {
              showModal(false);
            }}
          />

          <MotionParent className={s.art} variants={{}} layout>
            <MotionConfig
              transition={{
                duration: 1.4,
                ease: [0.165, 0.84, 0.44, 1],
              }}
            >
              <Img src={SignupBg} alt="signup bg" />

              <div className={s.text}>
                <Typography variant="body2">
                  <span>Get the full experience</span>
                  Enjoy faster bookings and refunds with us.
                </Typography>
              </div>
            </MotionConfig>
          </MotionParent>

          <motion.form className="col" layout onSubmit={formik.handleSubmit}>
            <LayoutGroup>
              <motion.div layout>
                <Typography variant="h4" className="title">
                  {signUp ? 'SignUp' : 'Login'}
                </Typography>
                <Typography variant="body2">
                  {signUp
                    ? 'Already have an account?'
                    : "Don't have an account yet?"}{' '}
                  &nbsp; &nbsp;
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSignUp(!signUp)}
                  >
                    {signUp ? 'LogIn' : 'SignUp'}
                  </Button>
                </Typography>
              </motion.div>
              <AnimatePresence mode="sync">
                {signUp && (
                  <>
                    <motion.div
                      variants={basicVariants}
                      inherit={false}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="hor"
                      layout
                    >
                      <TextField
                        required
                        name="firstName"
                        label="First name"
                        type="text"
                        variant="outlined"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={Boolean(
                          Array.isArray(formik.errors.firstName) &&
                            (formik.errors.firstName as any),
                        )}
                        helperText={
                          formik.errors.firstName &&
                          (formik.errors.firstName as any)
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        required
                        name="lastName"
                        label="Last name"
                        type="text"
                        variant="outlined"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={Boolean(
                          Array.isArray(formik.errors.lastName) &&
                            (formik.errors.lastName as any),
                        )}
                        helperText={
                          formik.errors.lastName &&
                          (formik.errors.lastName as any)
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>

                    <motion.div
                      variants={basicVariants}
                      inherit={false}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="hor"
                      layout
                    >
                      <TextField
                        required
                        label="Age"
                        name="age"
                        onChange={formik.handleChange}
                        value={formik.values.age}
                        error={Boolean(formik.errors.age)}
                        helperText={formik.errors.age}
                        type="number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SensorOccupied />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="Label"
                        />
                        <FormControlLabel
                          required
                          control={<Checkbox />}
                          label="Required"
                        />
                      </FormGroup>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
              <motion.div layout>
                <MuiTelInput
                  label="phone no"
                  name="phone"
                  required
                  fullWidth
                  forceCallingCode
                  focusOnSelectCountry
                  placeholder={Array(15).fill('_').join(' ')}
                  value={formik.values.phone}
                  onlyCountries={['ET']}
                  defaultCountry="ET"
                  onChange={(value, info) => {
                    console.log('value: ', info);
                    formik.setFieldValue('phone', value);
                  }}
                  error={Boolean(
                    formik.values.phone &&
                      !matchIsValidTel(formik.values.phone),
                  )}
                  helperText={
                    Boolean(
                      formik.values.phone &&
                        !matchIsValidTel(formik.values.phone),
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
              </motion.div>

              <motion.div layout>
                <TextField
                  required
                  name="Password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Visibility />
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <Password />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(
                    Array.isArray(formik.errors.password) &&
                      (formik.errors.password as any),
                  )}
                  helperText={
                    formik.errors.password && (formik.errors.password as any)
                  }
                />
              </motion.div>

              <AnimatePresence mode="sync">
                {signUp && (
                  <motion.div
                    variants={basicVariants}
                    inherit={false}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="hor"
                    layout
                  >
                    <TextField
                      required
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Visibility />
                          </InputAdornment>
                        ),
                      }}
                      error={Boolean(
                        Array.isArray(formik.errors.password) &&
                          (formik.errors.password as any),
                      )}
                      helperText={
                        formik.errors.password &&
                        (formik.errors.password as any)
                      }
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {!signUp && (
                <motion.div layout>
                  <Button className="forgot" variant="text">
                    Forgot password
                  </Button>
                </motion.div>
              )}

              <motion.div layout>
                <Button
                  size="large"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  {signUp ? 'Sign Up' : 'Sign in'}
                </Button>
              </motion.div>
            </LayoutGroup>
          </motion.form>
        </motion.div>
      </LayoutGroup>
    </MotionParent>
  );
};

export default RegistrationModal;
