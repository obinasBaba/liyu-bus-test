import axios from 'axios';
import { setLocations } from '../redux/location';
import { useQuery } from '@tanstack/react-query';
import { LOCATIONS } from './QUERY_KEYS';
import { useEffect } from 'react';

export const getLocations2 = dispatch => {
  axios
    .get('https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/location', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      let modifiedLocations = [];
      Promise.all(
        res?.data?.map(location => {
          modifiedLocations.push({ label: location.name, id: location.uuid });
        }),
      ).then(() => {
        dispatch(setLocations(modifiedLocations));
      });
    });
};

const getLocations = () => {
  return axios
    .get('https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/location', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    .then(res =>
      res?.data?.map(location => ({ label: location.name, id: location.uuid })),
    );
};

export const useLocations = (refreshKey = LOCATIONS) => {
  const query = useQuery({
    queryKey: [refreshKey],
    queryFn: getLocations,
    placeholderData: () => {
      return [];
    },
  });

  useEffect(() => {
    // console.log( 'query hero: ', query.error, query.isLoading, query.data )
  }, [query]);

  return query;
};
