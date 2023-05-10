import { QueryFunction, useQuery } from '@tanstack/react-query';
import API from '../lib/API';

type ActiveRoute = {
  uuid: string;
  name: string;
  departure: {
    uuid: string;
    addressDescription: string;
    name: string;
  };
  destination: {
    uuid: string;
    addressDescription: string;
    name: string;
  };
  routeType: string;
  distanceInKM: number;
};

export enum QUERY_KEYS {
  ACTIVE_TRIPS = 'ACTIVE_TRIPS',
}

const getActiveTrips: QueryFunction<ActiveRoute[]> = async ({ queryKey }) => {
  const res = await API.get('/route/get-active-route');

  console.log('getActiveTrips data ---- : ', res.data);

  return res.data;
};

const useActiveTrips = (
  key: string = QUERY_KEYS.ACTIVE_TRIPS,
  enabled: boolean = true,
) => {
  const activeTripsQuery = useQuery([key], {
    enabled,
    queryFn: getActiveTrips,
  });

  return activeTripsQuery;
};

export default useActiveTrips;
