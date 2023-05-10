import PrimaryButton from '../../components/button/primaryButton';
import RoomIcon from '@mui/icons-material/Room';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { diff } from '../../services/utils';

const DetailInformation = ({ travelDetail, setShow }) => {
  const totalTime = (
    <div>
      {diff(
        travelDetail?.schedule?.arrivalTime,
        travelDetail?.schedule?.departureTime,
      )}
    </div>
  );

  return (
    <div className="w-full mb-2 bg-[#393939] rounded text-sm">
      <div className="w-full bg-black bg-opacity-50 ">
        <h3 className="text-md text-bold py-3">
          Departure on{' '}
          <span className="text-blue-300">
            {new Date(travelDetail?.schedule?.departureDate).toDateString()}
          </span>
        </h3>
      </div>
      <div className="w-full flex">
        <div className="w-3/4 flex flex-col space-y-1">
          <h1 className="pl-8 mb-3 text-lg text-blue-300">Abay Bus</h1>
          <div className="flex w-full space-x-3">
            <RoomIcon
              sx={{
                color: '#FF6B1B',
              }}
            />
            <span>
              {travelDetail?.schedule?.departureDate} (
              {travelDetail?.schedule?.departureTime})
            </span>
            <span className="text-blue-300">
              {travelDetail?.schedule?.route?.departureLocationName}
            </span>
          </div>
          <div className="flex w-full space-x-3">
            <RoomIcon
              sx={{
                color: '#FF6B1B',
              }}
            />
            <span>
              {travelDetail?.schedule?.departureDate} (
              {travelDetail?.schedule?.arrivalTime})
            </span>
            <span className="text-blue-300">
              {travelDetail?.schedule?.route?.destinationLocationName}
            </span>
          </div>
          <div className="flex w-full space-x-3 mb-2">
            <AccessTimeIcon
              sx={{
                color: '#FF6B1B',
              }}
            />
            <span>{totalTime}</span>
          </div>
        </div>
        <div className="w-1/4 flex flex-col justify-between border border-[#FF6B1B] border-y-0 border-r-0 rounded pl-4 ">
          <span>
            {travelDetail?.schedule?.tariff?.amount *
              travelDetail?.selectedSeats?.length}
            ETB
          </span>
          <div className="flex flex-col space-y-1 mb-2">
            <span>
              Passengers:{' '}
              <span className="text-blue-300">
                {travelDetail?.selectedSeats?.length}
              </span>
            </span>
            <span>
              Seats:{' '}
              <span className="text-blue-300">
                {travelDetail?.selectedSeats?.join(', ')}{' '}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailInformation;

{
  /* <div className="w-full flex flex-col">
  <h2 className="text-2xl font-bold">Travel Detail</h2>
  <h4 className="text-sm">You Can Review And Edit Your Booking Here</h4>
  <div className="w-full flex justify-between">
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <span className="text-md font-bold">Departure Location</span>
        <span className="text-sm text-[#FF6B1B] text-[0.675rem] font-bold">
          {travelDetail.departureLocation}
        </span>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="text-md font-bold">Arrival Location</span>
        <span className="text-sm text-[#FF6B1B] text-[0.675rem] font-bold">
          {travelDetail.arrivalLocation}
        </span>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="text-md font-bold">Departure Date</span>
        <span className="text-sm text-[#FF6B1B] text-[0.675rem] font-bold">
          {travelDetail.departureDate}
        </span>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="text-md font-bold">Return Date</span>
        <span className="text-sm text-[#FF6B1B] text-[0.675rem] font-bold">
          {travelDetail.returnDate}
        </span>
      </div>
    </div>
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-2">
        <span className="text-md font-bold">Onboarding Location</span>
        <span className="text-sm text-[#FF6B1B] text-[0.675rem] font-bold">
          {travelDetail.onBoardingLocation}
        </span>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="text-md font-bold">Off-boarding Location</span>
        <span className="text-sm text-[#FF6B1B] text-[0.675rem] font-bold">
          {travelDetail.offBoardingLocation}
        </span>
      </div>
    </div>
  </div>
</div>;

{ *
  /* <div className="flex space-x-4">
        <PrimaryButton label={"Edit"} onClick={() => {}} className="my-3" />
        <PrimaryButton
          label={"Continue"}
          onClick={() => {
            setShow(true);
          }}
          className="my-3"
        />
      </div> */
}
