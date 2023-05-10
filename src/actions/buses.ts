import { useQuery } from '@tanstack/react-query';
import { BUSES } from './QUERY_KEYS';
import { useEffect } from 'react';
import API from '../lib/API';

const queryFn = () => {
  return API.get('/organization').then(res => {
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
