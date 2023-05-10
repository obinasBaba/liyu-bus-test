import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import PrimaryButton from '../button/primaryButton';
import Input2 from '../form/inputs2';

const CreateAccountSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string().min(8, 'Too Short').required('Required'),
  confirmPassword: Yup.string().min(8, 'Too Short').required('Required'),
  phoneNumber: Yup.string().min(9, 'Too Short'),
});

const CreateAccount = () => {
  const navigate = useNavigate();
  return (
    <section className="text-white text-sm h-full bg-black bg-opacity-70">
      <div className="flex h-full flex-col items-center justify-center mx-auto lg:py-0">
        <h3 className="text-xl font-bold pt-3">Create Account</h3>
        <div className="w-full shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="">
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: '',
                remember: false,
                phoneNumber: '',
              }}
              onSubmit={values => {
                navigate('/travelDetail');
              }}
              validationSchema={CreateAccountSchema}
            >
              {({ values, errors, handleChange, handleSubmit }) => {
                return (
                  <form className="">
                    <div className="text-xs text-left flex flex-col my-4">
                      <label>
                        Enter Your Name, Phone Number And Email For Sign Up.
                        Already Have Account?
                        <span
                          className="text-[#ff6b1b] font-bold"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            navigate('/signIn');
                          }}
                        >
                          Sign In
                        </span>
                      </label>
                    </div>
                    <div className="w-full flex my-2 text-left">
                      <div className="mr-4 w-1/2">
                        <Input2
                          title="First Name"
                          name="firstName"
                          label="First Name"
                          onChange={handleChange}
                          className=""
                          inputClassName=""
                          value={values.firstName}
                          error={errors.firstName}
                        />
                      </div>
                      <div className="ml-4 w-1/2">
                        <Input2
                          title="Last Name"
                          name="lastName"
                          label="Last Name"
                          onChange={handleChange}
                          className=""
                          inputClassName=""
                          value={values.lastName}
                          error={errors.lastName}
                        />
                      </div>
                    </div>
                    <div className="w-full my-2 text-left">
                      <label className="text-md">Phone Number</label>
                      <div className="flex">
                        <Input2
                          type="text"
                          value={'+251'}
                          className=" w-1/4 mr-2"
                        />
                        <Input2
                          name="phoneNumber"
                          type="tel"
                          onChange={handleChange}
                          className=" w-3/4"
                          inputClassName=""
                          value={values.phoneNumber}
                          error={errors.phoneNumber}
                        />
                      </div>
                    </div>

                    <div className="my-4 text-left w-full">
                      <Input2
                        title="Password"
                        name="password"
                        label="Password"
                        type="password"
                        onChange={handleChange}
                        className=""
                        inputClassName=""
                        value={values.password}
                        error={errors.password}
                      />
                    </div>

                    <div className="my-4 text-left">
                      <Input2
                        title="Confirm Password"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        onChange={handleChange}
                        className=""
                        inputClassName=""
                        value={values.confirmPassword}
                        error={errors.confirmPassword}
                      />
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          type="checkbox"
                          className="w-4 h-4 border bg-transparent border-[#ff6b1b] focus:ring-3 focus:ring-[#ff6b1b] "
                          checked={values.remember}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label form="remember" className=" text-xs">
                          I agree to the Term and Condition
                        </label>
                      </div>
                    </div>
                    <div className="w-1/2 my-3">
                      <PrimaryButton
                        label="Sign Up"
                        onClick={handleSubmit}
                        className="font-bold w-full capitalize rounded-none py-2"
                      />
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateAccount;
