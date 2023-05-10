import * as Yup from 'yup';
import { Formik } from 'formik';

import PrimaryButton from '../button/primaryButton';
import Select from '../form/select';
import Input2 from '../form/inputs2';
import { useNavigate } from 'react-router-dom';

const PersonalInformationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  gender: Yup.string().required('Required'),
  age: Yup.string().required('Required'),
  phoneNumber: Yup.string().min(9, 'Too Short'),
  email: Yup.string().email('Invalid Email'),
});

const PersonalInformation = ({ setFormToShow }) => {
  const navigate = useNavigate();
  return (
    <section className="text-white text-sm">
      <h3 className="text-left text-lg mb-1">Personal Information</h3>
      <div className="flex flex-col items-center justify-center mx-auto lg:py-0">
        <div className="w-full shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="">
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                gender: '',
                age: '',
                phoneNumber: '',
                email: '',
              }}
              onSubmit={values => {
                navigate('/travelDetail');
              }}
              validationSchema={PersonalInformationSchema}
            >
              {({ values, errors, handleChange, handleSubmit, touched }) => {
                return (
                  <form className="">
                    <div className="text-xs text-left flex flex-col my-4">
                      <label>
                        Enter Your Name, Phone Number And Email To Complete Your
                        Booking
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
                          touched={touched.firstName}
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
                          touched={touched.lastName}
                        />
                      </div>
                    </div>
                    <div className="w-full flex my-2 text-left">
                      <div className="mr-4 w-1/2">
                        <Select
                          label={'Gender'}
                          name={'gender'}
                          onChange={handleChange}
                          options={[
                            {
                              value: 'M',
                              label: 'Male',
                            },
                            {
                              value: 'F',
                              label: 'Female',
                            },
                          ]}
                          transparent
                          value={values.gender}
                          error={errors.gender}
                        />
                      </div>
                      <div className="ml-4 w-1/2">
                        <Input2
                          title="Age"
                          name="age"
                          label="age"
                          onChange={handleChange}
                          className=""
                          inputClassName=""
                          value={values.age}
                          error={errors.age}
                          touched={touched.age}
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
                          touched={touched.phoneNumber}
                        />
                      </div>
                    </div>

                    <div className="my-4 text-left w-full">
                      <Input2
                        title={
                          <>
                            Email{' '}
                            <span className="text-[#FF6B1B]">(Optional)</span>
                          </>
                        }
                        name="email"
                        label="email"
                        onChange={handleChange}
                        className=""
                        inputClassName=""
                        value={values.email}
                        error={errors.email}
                        touched={touched.email}
                      />
                    </div>

                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          class="w-4 h-4 border bg-transparent border-[#ff6b1b] focus:ring-3 focus:ring-[#ff6b1b] "
                          required=""
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="remember" class=" text-xs">
                          I agree to the Term and Condition
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="grow my-3">
                        <PrimaryButton
                          label="CONTINUE"
                          onClick={() => {
                            handleSubmit();
                          }}
                          className="font-bold w-full capitalize rounded-none py-2 border border-[#FF6B1B]"
                        />
                      </div>
                      <span className="mx-5">OR</span>
                      <div className="grow my-3">
                        <PrimaryButton
                          onClick={() => {
                            setFormToShow('other');
                          }}
                          label={'REGISTER'}
                          className="bgTransparent border border-[#FF6B1B] capitalize hover:bg-[#FF6B1B]"
                        />
                      </div>
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

export default PersonalInformation;
