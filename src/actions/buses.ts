import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { BUSES } from './QUERY_KEYS';
import { useEffect } from 'react';

const queryFn = () => {
  return axios
    .get(
      'https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/organization',
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      },
    )
    .then(res => {
      // console.log('res: ', res);
      return res?.data?.map(bus => ({ label: bus.name, id: bus.uuid }));
    });
};

export const useBuses = (refreshKey = BUSES) => {
  const query = useQuery({
    queryKey: [refreshKey],
    queryFn,
    placeholderData: () => {
      return [];
    },
  });

  useEffect(() => {
    // console.log( 'query hero: ', query.error, query.isLoading, query.data )
  }, [query]);

  return query;
};
