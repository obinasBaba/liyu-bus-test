import { QueryFunction, useQuery } from '@tanstack/react-query';

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
  const res = await fetch(
    'https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/api/route/get-active-route',
  );

  const activeRoutes = await res.json();

  console.log('getActiveTrips data ---- : ', activeRoutes);

  return activeRoutes;
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
