import { useState } from 'react';
import CreateAccount from './createAccount';
import PersonalInformation from './personalInformation';
import SignInForm from './signInForm';

const FormContainer = ({ formToShow, setFormToShow }) => {
  const [contentToShow, setContentToShow] = useState('sign-in');
  return (
    <div className="w-3/4 mx-auto">
      {formToShow === 'personal-information' ? (
        <PersonalInformation setFormToShow={setFormToShow} />
      ) : (
        <>
          <div className="">
            <ul className="flex flex-wrap text-sm font-medium text-center">
              <span
                className="mr-2 cursor-pointer text-green"
                onClick={() => {
                  setContentToShow('sign-in');
                }}
              >
                <button
                  className={`inline-block p-1 font-bold ${
                    contentToShow === 'sign-in' &&
                    ' border border-2 border-[#FF6B1B]'
                  }`}
                  type="button"
                >
                  Sign In
                </button>
              </span>
              <span
                className="mr-2 cursor-pointer text-green"
                onClick={() => {
                  setContentToShow('create');
                }}
              >
                <button
                  className={`inline-block p-1 font-bold ${
                    contentToShow === 'create' &&
                    ' border border-2 border-[#FF6B1B]'
                  }`}
                  type="button"
                >
                  Create Account
                </button>
              </span>
            </ul>
          </div>
          <div id="myTabContent">
            {contentToShow === 'sign-in' ? (
              <div>
                <SignInForm />
              </div>
            ) : (
              <div>
                <CreateAccount />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FormContainer;
