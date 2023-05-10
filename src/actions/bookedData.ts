import { QueryFunction, useQuery } from '@tanstack/react-query';
import API from '../lib/API';
import { useSelector } from 'react-redux';
import { StoreType } from '../redux/store';
import { useEffect } from 'react';
import { BOOKED_DATA } from './QUERY_KEYS';

type BookedData = {
  bookingUUIds: string;
};

const queryFn: QueryFunction<any, [string, BookedData]> = ({
  queryKey,
}): Promise<BookedData> => {
  const [key, { bookingUUIds }] = queryKey;

  console.log('bookingUUID: ', bookingUUIds);
  return API.get(`/booking/get-booking/${bookingUUIds}`).then(res => {
    // return API.get(`/ticket/get-tickets/${[bookingUUIds]}`).then(res => {
    console.log('useBookedData res: ', res);
    return res.data;
  });
};

export const useBookedData = (refreshKey = BOOKED_DATA) => {
  const bookingDetail = useSelector(
    (state: StoreType) => state.booking.bookingDetail,
  );

  const query = useQuery({
    enabled: Boolean(bookingDetail?.bookingUUIds),
    queryKey: [
      refreshKey,
      {
        bookingUUIds: bookingDetail?.bookingUUIds[0],
      },
    ],
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
