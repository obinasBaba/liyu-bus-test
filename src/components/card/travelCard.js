import PrimaryButton from '../button/primaryButton';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SecondaryButton from '../button/secondaryButton';
import { diff } from '../../services/utils';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';

const TravelCard = ({
  showSeats = false,
  disabled,
  setShowOptions,
  searchResult,
  // request,
}) => {
  const request = useSelector(state => state?.search?.request);

  let remainingSeats;
  let returnTravelRemainingSeats;

  if (request && request?.oneTimeTrip) {
    remainingSeats =
      60 -
      // searchResult?.occupiedSeats?.length -
      searchResult.reservedSeats?.length;
  } else {
    if (!searchResult?.firstTrip) {
      remainingSeats =
        60 -
        // searchResult?.occupiedSeats?.length -
        searchResult.reservedSeats?.length;
    } else {
      remainingSeats =
        60 -
        searchResult?.firstTrip[0].occupiedSeats?.length -
        searchResult?.firstTrip[0].reservedSeats?.length;
      returnTravelRemainingSeats =
        60 -
        searchResult?.secondTrip[0].occupiedSeats?.length -
        searchResult?.secondTrip[0].reservedSeats?.length;
    }
  }
  const totalTime = (
    <div>{diff(searchResult?.arrivalTime, searchResult?.departureTime)}</div>
  );

  return (request && request?.oneTimeTrip) || !searchResult?.firstTrip ? (
    <div className="mb-2 bg-[#393939] rounded">
      <div className="flex divide-x divide-dashed">
        <div className="w-3/4 ">
          <div className="ml-7 mt-5">
            <h2 className="text-[#FF6B1B] text-sm font-bold mb-2">
              {searchResult?.organizationName || 'organization name'}
            </h2>
            <div className="flex items-center justify-between w-2/3">
              <div className="flex flex-col">
                <span className="text-xs my-2">Departure Time</span>
                <div className="flex items-center space-x-1">
                  <span className="text-xl font-bold my-1">
                    {searchResult?.departureTime}
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
                    {searchResult?.arrivalTime}
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
                {searchResult?.tariff?.amount} EBT
              </h2>
            </div>
            <div className="my-1">
              <LoadingButton
                size="large"
                color="primary"
                variant="contained"
                disabled={disabled}
                label={'Options'}
                onClick={() => {
                  if (disabled) return;
                  setShowOptions();
                }}
                className="w-full"
              >
                Proceed
              </LoadingButton>
            </div>
            {showSeats && (
              <div className="w-full">
                <label className="text-xs text-left whitespace-nowrap pl-6">
                  {remainingSeats} Seats left
                </label>
              </div>
            )}
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
                {searchResult?.firstTrip[0].vehicleType.name}
              </h2>
              <div className="flex items-center justify-between w-2/3">
                <div className="flex flex-col">
                  <span className="text-xs my-2">Departure Time</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xl font-bold my-1">
                      {searchResult?.firstTrip[0].departureTime}
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
                      {searchResult?.firstTrip[0].arrivalTime}
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
                  {searchResult?.firstTrip[0].price} ETB
                </h2>
              </div>
              {showSeats && (
                <div className="w-full mb-2">
                  <label className="text-xs text-left whitespace-nowrap pl-6">
                    {returnTravelRemainingSeats} Seats left
                  </label>
                </div>
              )}
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
                      {searchResult?.secondTrip[0].departureTime}
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
                      {searchResult?.secondTrip[0].arrivalTime}
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
          <div class="w-1/4 ">
            <div className="w-2/3 flex items-end flex-col mr-7 mt-3 ml-auto">
              <div className="mb-2">
                <h4 className="text-right text-xs whitespace-nowrap">
                  Starts from
                </h4>
              </div>
              <div className="mb-2">
                <h2 className="text-right text-sm font-bold whitespace-nowrap">
                  {searchResult?.secondTrip[0].price} ETB
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
              {showSeats && (
                <div className="w-full">
                  <label className="text-xs text-left whitespace-nowrap pl-6">
                    {remainingSeats} Seats left
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
