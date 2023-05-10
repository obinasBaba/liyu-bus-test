import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSelector } from 'react-redux';
import ActiveTrip from './activeTrip';

const ActiveTrips = () => {
  const activeTrips = useSelector(state => state?.trip?.activeTrips);
  return (
    activeTrips && (
      <div className="w-full bg-black">
        <div className="w-3/4 mx-auto">
          <div className="col-span-3 py-3">
            <div className="grid grid-cols-1">
              <div className="flex items-center justify-start">
                <h2 className="text-3xl font-bold uppercase ">Active Trips </h2>
                <ArrowForwardIosIcon
                  sx={{
                    color: '#FF6B1B',
                    fontWeight: '900',
                    fontSize: '30px',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-3 gap-1 px-auto justify-center">
            {activeTrips?.map(activeTrip => (
              <ActiveTrip activeTrip={activeTrip} />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default ActiveTrips;
