import PrimaryButton from '../../button/primaryButton';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SecondaryButton from '../../button/secondaryButton';
import { diff } from '../../../services/utils';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import './sd.scss';
import { FlightLand, FlightTakeoff, Start } from '@mui/icons-material';

const ScheduleDetail = ({
  disabled,
  setShowOptions,
  schedule,
  // request,
}) => {
  const request = useSelector(state => state?.search?.request);

  let remainingSeats;
  let returnTravelRemainingSeats;

  if (request && request?.oneTimeTrip) {
    remainingSeats =
      60 -
      // searchResult?.occupiedSeats?.length -
      schedule.reservedSeats?.length;
  } else {
    if (!schedule?.firstTrip) {
      remainingSeats =
        60 -
        // searchResult?.occupiedSeats?.length -
        schedule.reservedSeats?.length;
    } else {
      remainingSeats =
        60 -
        schedule?.firstTrip[0].occupiedSeats?.length -
        schedule?.firstTrip[0].reservedSeats?.length;
      returnTravelRemainingSeats =
        60 -
        schedule?.secondTrip[0].occupiedSeats?.length -
        schedule?.secondTrip[0].reservedSeats?.length;
    }
  }
  const totalTime = (
    <div>{diff(schedule?.arrivalTime, schedule?.departureTime)}</div>
  );

  return request && true ? (
    <div className="sd_container">
      <div className="flex divide-x divide-dashed divide-black">
        <div className="w-3/4 ">
          <div className="ml-7 mt-5">
            <h2 className="text-[#FF6B1B] text-sm font-bold mb-2">
              {schedule?.organizationName || 'organization name'}
            </h2>

            <div className="flex items-center justify-between w-2/3">
              <div className="flex flex-col">
                <span className="text-xs my-2">Departure Time</span>
                <div className="flex items-center space-x-1">
                  <span className="text-xl font-bold my-1">
                    {schedule?.departureTime}
                  </span>
                  <FlightTakeoff />
                </div>
              </div>
              <img
                src="/img/Travel Icon.png"
                className="grow mx-3 h-3 mt-6"
                height={10}
                width={100}
                alt="travel icon"
              />
              <div className="flex flex-col">
                <span className="text-xs my-2">Arrival Time</span>
                <div className="flex items-center space-x-1">
                  <FlightLand />

                  <span className="text-xl font-bold my-1">
                    {schedule?.arrivalTime}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-1 mb-3">
              <AccessTimeIcon color="primary" />
              <span className="ml-1 text-sm">{totalTime}</span>
            </div>
          </div>
        </div>
        <div className="w-1/4 ">
          <div className="w-2/3 flex items-end flex-col mr-7 mt-3 ml-auto">
            <div className="mb-2 flex items-center">
              <h4 className="text-right text-xs whitespace-nowrap">
                Starts from :
              </h4>{' '}
              <h2 className="text-right text-sm font-bold whitespace-nowrap">
                {schedule?.tariff?.amount} ETB
              </h2>
            </div>

            <div className="w-full">
              <label className="text-xs text-left whitespace-nowrap pl-6">
                {remainingSeats} Seats left
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="mb-2 bg-[#393939] rounded flex flex-col divide-y divide-dashed">
      <div className="">
        <div className="flex">
          <div className="w-3/4 ">
            <div className="ml-7 mt-5">
              <h2 className="text-[#FF6B1B] text-sm font-bold mb-2">
                {schedule?.firstTrip[0].vehicleType.name}
              </h2>
              <div className="flex items-center justify-between w-2/3">
                <div className="flex flex-col">
                  <span className="text-xs my-2">Departure Time</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xl font-bold my-1">
                      {schedule?.firstTrip[0].departureTime}
                    </span>
                    <img
                      src="/img/Icon feather-sunrise.png"
                      width={20}
                      height={20}
                      alt="sunrise icon"
                    />
                  </div>
                </div>
                <img
                  src="/img/Travel Icon.png"
                  className="grow mx-3 h-3 mt-6"
                  height={10}
                  width={100}
                  alt="travel icon"
                />
                <div className="flex flex-col">
                  <span className="text-xs my-2">Arrival Time</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xl font-bold my-1">
                      {schedule?.firstTrip[0].arrivalTime}
                    </span>
                    <img
                      src="/img/Icon feather-sunset.png"
                      width={20}
                      height={20}
                      alt="sunset icon"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center mt-1 mb-3">
                <AccessTimeIcon
                  sx={{
                    color: `${!disabled && '#FF6B1B'}`,
                  }}
                />
                <span className="ml-1 text-sm">{totalTime}</span>
              </div>
            </div>
          </div>
          <div className="w-1/4">
            <div className="w-2/3 flex flex-col items-end justify-between h-full mr-7 mt-3 ml-auto">
              <div className="flex flex-col">
                <div className="mb-2">
                  <h4 className="text-right text-xs whitespace-nowrap">
                    Starts from
                  </h4>
                </div>
              </div>

              <div className="mb-2">
                <h2 className="text-right text-sm font-bold whitespace-nowrap">
                  {schedule?.firstTrip[0].price} EBT
                </h2>
              </div>
              <div className="w-full mb-2">
                <label className="text-xs text-left whitespace-nowrap pl-6">
                  {returnTravelRemainingSeats} Seats left
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex">
          <div className="w-3/4 ">
            <div className="ml-7 mt-5">
              <h2 className="text-[#FF6B1B] text-xs font-bold mb-2 bg-[#FF6B1B] bg-opacity-50 rounded p-1 w-max">
                Return Travel
              </h2>
              <div className="flex items-center justify-between w-2/3">
                <div className="flex flex-col">
                  <span className="text-xs my-2">Departure Time</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xl font-bold my-1">
                      {schedule?.secondTrip[0].departureTime}
                    </span>
                    <img
                      src="/img/Icon feather-sunrise.png"
                      width={20}
                      height={20}
                      alt="sunrise icon"
                    />
                  </div>
                </div>
                <img
                  src="/img/Travel Icon.png"
                  className="grow mx-3 h-3 mt-6"
                  height={10}
                  width={100}
                  alt="travel icon"
                />
                <div className="flex flex-col">
                  <span className="text-xs my-2">Arrival Time</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xl font-bold my-1">
                      {schedule?.secondTrip[0].arrivalTime}
                    </span>
                    <img
                      src="/img/Icon feather-sunset.png"
                      width={20}
                      height={20}
                      alt="sunset icon"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center mt-1 mb-3">
                <AccessTimeIcon
                  sx={{
                    color: `${!disabled && '#FF6B1B'}`,
                  }}
                />
                <span className="ml-1 text-sm">{totalTime}</span>
              </div>
            </div>
          </div>
          <div className="w-1/4 ">
            <div className="w-2/3 flex items-end flex-col mr-7 mt-3 ml-auto">
              <div className="mb-2">
                <h4 className="text-right text-xs whitespace-nowrap">
                  Starts from
                </h4>
              </div>
              <div className="mb-2">
                <h2 className="text-right text-sm font-bold whitespace-nowrap">
                  {schedule?.secondTrip[0].price} EBT
                </h2>
              </div>
              <div className="my-1">
                {disabled ? (
                  <SecondaryButton label={'Traveled'} onClick={() => {}} />
                ) : (
                  <PrimaryButton
                    label={'Options'}
                    onClick={() => {
                      setShowOptions();
                    }}
                    className="w-full"
                  />
                )}
              </div>
              <div className="w-full">
                <label className="text-xs text-left whitespace-nowrap pl-6">
                  {remainingSeats} Seats left
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetail;
