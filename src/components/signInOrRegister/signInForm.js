import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import PrimaryButton from '../button/primaryButton';
import Input2 from '../form/inputs2';

const SignInSchema = Yup.object().shape({
  phoneNumber: Yup.string().min(9, 'Too Short').required('Required'),
  password: Yup.string().min(8, 'Too Short').required('Required'),
});

const SignInForm = () => {
  const navigate = useNavigate();
  return (
    <section className="text-white h-full bg-black bg-opacity-70">
      <div className="h-full flex flex-col items-center justify-center mx-auto lg:py-0">
        <h3 className="text-xl font-bold pt-3">Sign In</h3>
        <div className="w-full shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="">
            <Formik
              initialValues={{
                phoneNumber: '',
                password: '',
              }}
              onSubmit={values => {
                navigate('/travelDetail');
              }}
              validationSchema={SignInSchema}
            >
              {({ values, errors, handleChange, handleSubmit }) => {
                return (
                  <form className="">
                    <div className="text-xs text-left flex flex-col my-4">
                      <label>
                        Enter Your Name, Phone Number And Email For Sign In.
                      </label>
                      <label>
                        You Don't Have Account?{' '}
                        <span
                          className="text-[#ff6b1b] font-bold"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            navigate('/signUp');
                          }}
                        >
                          Create Account
                        </span>
                      </label>
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
                          className="w-3/4"
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
                    <div className="flex items-center justify-end">
                      <a
                        href="#"
                        className="text-xs text-[#ff6b1b] font-medium"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="w-1/2 my-6 flex items-center justify-center">
                      <PrimaryButton
                        label="Sign in"
                        onClick={() => {
                          handleSubmit();
                        }}
                        className="font-bold w-full capitalize rounded-none py-2"
                      />
                    </div>
                    <div className="w-1/2 flex flex-col items-center text-xs mb-4">
                      <span>OR</span>
                      <span>Sign Up With</span>
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

export default SignInForm;
