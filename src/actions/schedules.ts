import { TripInfo } from '../redux/search';
import API from '../lib/API';
import { useSelector } from 'react-redux';
import { StoreType } from '../redux/store';
import { useEffect } from 'react';
import { QueryFunction, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './QUERY_KEYS';

export const getSchedules = (dispatch, sentRequest, navigate) => {};

export const getRoundTripSchedules = (dispatch, sentRequest, navigate) => {};

type Schedule = Record<string, any>;

export type Trip = {
  schedules: Schedule[];
  alternatives: Schedule[];
  notFound: boolean;
  alternativesNotFound: boolean;
  scheduleNotFound: boolean;
};

export type TripSchedules = {
  firstTrip: Trip;
  secondTrip?: Trip;
  isTwoWayTrip: boolean;
};

const fetchSchedules: QueryFunction<
  TripSchedules,
  [string, string, TripInfo]
> = ({ queryKey }): Promise<TripSchedules> => {
  const [, type, tripInfo] = queryKey;

  // console.log('trip:info fetchSchedules: ', tripInfo, _key);

  const requestBody = {
    departureLocationUUId: tripInfo.from?.id,
    destinationLocationUUId: tripInfo?.to?.id,
    departureDate: tripInfo.departureDate,
    ...(tripInfo.twoWayTrip && { returnDate: tripInfo.returnDate }), // busCompanyId: 0,
    busCompanyUUId: tripInfo?.bus?.id,
  };

  return API.post(`/schedule/${type}`, requestBody).then(res => {
    // console.log('fetchSchedules res: ', res);

    if (tripInfo.twoWayTrip) {
      // to reduce code redundancy
      const checkIfNotFound = (tripType: 'firstTrip' | 'secondTrip') => {
        const alternativesNotFound = !(
          res?.data?.alternateRoundTripSchedule?.[tripType]?.length > 0
        );

        console.log('alternativesNotFound: ', alternativesNotFound, tripType);

        const scheduleNotFound = !(
          res?.data?.roundTripSchedule?.[tripType]?.length > 0
        );
        const notFound = scheduleNotFound && alternativesNotFound;
        return { alternativesNotFound, scheduleNotFound, notFound };
      };

      const schedules: TripSchedules = {
        firstTrip: {
          schedules: res?.data?.roundTripSchedule?.firstTrip,
          alternatives: res?.data?.alternateRoundTripSchedule?.firstTrip,
          ...checkIfNotFound('firstTrip'),
        },
        secondTrip: {
          schedules: res?.data?.roundTripSchedule?.secondTrip,
          alternatives: res?.data?.alternateRoundTripSchedule?.secondTrip,
          ...checkIfNotFound('secondTrip'),
        },
        isTwoWayTrip: tripInfo.twoWayTrip,
      };

      return schedules;
    }

    const schedules: TripSchedules = {
      firstTrip: {
        schedules: res?.data?.schedules,
        alternatives: res?.data?.alternate,
        alternativesNotFound: res?.data?.alternate?.length === 0,
        scheduleNotFound: res?.data?.schedules?.length === 0,
        notFound:
          res?.data?.schedules?.length === 0 &&
          res.data?.alternate?.length === 0,
      },
      isTwoWayTrip: tripInfo.twoWayTrip,
    };

    return schedules;

    /* if (tripInfo.twoWayTrip) {
       return res?.data?.roundTripSchedule;
     } else {
       return {
         // note: this is a temporary fix to make both similar from the api
         firstTrip: res?.data?.schedules,
       };
     }*/
  });
};

export const useSchedules = (refreshKey = QUERY_KEYS.SCHEDULES) => {
  const tripInfo = useSelector((state: StoreType) => state.search.tripInfo);

  const query = useQuery({
    enabled: tripInfo !== null,
    queryKey: [
      QUERY_KEYS.SCHEDULES,
      tripInfo?.twoWayTrip ? 'get-round-trip-schedule' : 'get-schedule',
      tripInfo,
    ],
    queryFn: fetchSchedules,
  });

  useEffect(() => {
    // console.log('requestBody -- : ', tripInfo);
  }, [tripInfo]);

  return query;
};
