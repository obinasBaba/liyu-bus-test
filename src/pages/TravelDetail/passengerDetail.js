import { useEffect, useState } from 'react';
import PrimaryButton from '../../components/button/primaryButton';
import SecondaryButton from '../../components/button/secondaryButton';
import PassengerInfo from './passengerInfo';

const PassengerDetail = ({ seatNumbers, handleSubmit }) => {
  const [passengersDetails, setPassengersDetails] = useState([]);
  const [resetData, setResetData] = useState(false);

  const changePassengerDetails = passengerDetails => {
    setResetData(!resetData);
    setPassengersDetails(passengerDetails);
  };

  useEffect(() => {}, [resetData]);

  return (
    <div className="w-full flex flex-col space-y-3">
      <div className="flex flex-col space-y-1">
        <span className="text-sm font-bold">Passengers Details</span>
        <form className="h-full flex flex-col justify-between items-start space-y-3">
          {seatNumbers?.map((seatNumber, index) => {
            return (
              <PassengerInfo
                setPassengersDetails={arr => {
                  changePassengerDetails(arr);
                }}
                passengersDetails={passengersDetails}
                index={index}
                seatNumber={seatNumber}
              />
            );
          })}

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 border bg-transparent border-[#ff6b1b] focus:ring-3 focus:ring-[#ff6b1b] "
                required=""
              />
            </div>
            <div className="ml-3 text-sm">
              <label for="remember" className=" text-xs">
                Create an account using the main passenger Information?
              </label>
            </div>
          </div>

          <PrimaryButton
            label={'Reserve Seat'}
            onClick={() => handleSubmit(passengersDetails)}
          />
        </form>
      </div>
    </div>
  );
};

export default PassengerDetail;
