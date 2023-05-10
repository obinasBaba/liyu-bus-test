import { useState } from 'react';
import PassengerInfo from './passengerInfo';
import PrimaryButton from '../../components/button/primaryButton';
import { useSelector } from 'react-redux';
import SecondaryButton from '../../components/button/secondaryButton';

const SeatDetail = ({
  seatNumbers,
  setMain,
  setReturnSeat,
  main,
  returnSeat,
  detailType,
  handleSubmit,
}) => {
  const { request } = useSelector(state => state?.search);
  const [passengersDetails, setPassengersDetails] = useState([]);
  const onSubmit = e => {
    console.log('19');
    e.preventDefault();
    if (detailType === 'main') {
      console.log(passengersDetails);
      setMain(...main, ...passengersDetails);
    } else {
      setReturnSeat(...returnSeat, ...passengersDetails);
    }
    setTimeout(() => {
      handleSubmit();
    }, 500);
  };

  return (
    <div className="flex flex-col space-y-1">
      <span className="text-sm font-bold">Passengers Details</span>
      <form
        className="h-full flex flex-col justify-between items-start space-y-3"
        onSubmit={onSubmit}
      >
        {seatNumbers?.map((seatNumber, index) => {
          return (
            <PassengerInfo
              setPassengersDetails={arr => {
                setPassengersDetails(arr);
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

        {!request.oneTimeTrip ? (
          passengersDetails.length === seatNumbers.length ? (
            <PrimaryButton label={'Reserve Seat'} onClick={handleSubmit} />
          ) : (
            <SecondaryButton label={'Reserve Seat'} />
          )
        ) : passengersDetails.length === seatNumbers.length ? (
          <PrimaryButton label={'Reserve Seat'} onClick={handleSubmit} />
        ) : (
          <SecondaryButton label={'Reserve Seat'} />
        )}
      </form>
    </div>
  );
};

export default SeatDetail;
