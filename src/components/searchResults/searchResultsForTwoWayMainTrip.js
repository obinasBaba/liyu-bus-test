import { useSelector } from 'react-redux';
import { converterDateTime } from '../../services/dateConverter';
import { getDateArray } from '../../services/utils';
import DateFilters from './dateFilters';
import SearchResultForTwoWayMainTrip from './searchResultForTwoWayMainTrip';

const SearchResultsForTwoWayMainTrip = ({ results }) => {
  const { request } = useSelector(state => state?.search);

  const startDate = new Date(
    converterDateTime.toEuropean({
      year: parseInt(request?.departureDate?.split('/')[2]),
      month: parseInt(request?.departureDate?.split('/')[1]),
      date: parseInt(request?.departureDate?.split('/')[0]),
    }),
  );

  const endDate = new Date(
    converterDateTime.toEuropean({
      year: parseInt(request?.departureDate?.split('/')[2]),
      month: parseInt(request?.departureDate?.split('/')[1]),
      date: parseInt(request?.departureDate?.split('/')[0]),
    }),
  ).setDate(parseInt(request?.departureDate?.split('/')[0]) + 4); //YYYY-MM-DD

  const relatedDates = getDateArray(startDate, endDate);
  return (
    <div className="grow mt-10 w-full text-left bg-black">
      <div className="text-white w-3/4 mx-auto">
        <h2 className="py-3 text-sm">Search Result ({results?.length})</h2>
        <DateFilters relatedDates={relatedDates} />
        {results?.map(searchResult => {
          return (
            <div className="flex flex-col">
              <SearchResultForTwoWayMainTrip searchResult={searchResult} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResultsForTwoWayMainTrip;
