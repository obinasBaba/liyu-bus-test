import { useQuery } from '@tanstack/react-query';
import { LOCATIONS } from './QUERY_KEYS';
import { useEffect } from 'react';
import API from '../lib/API';

const getLocations = () => {
  return API.get('/location').then(res =>
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
