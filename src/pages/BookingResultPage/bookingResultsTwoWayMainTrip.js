import { useSelector } from 'react-redux';

import RequestBook from '../../components/book/requestBook';
import NavBar from '../../layout/TopNavBar/navbar';
import SearchResultsForTwoWayMainTrip from '../../components/searchResults/searchResultsForTwoWayMainTrip';

const BookingResultsTwoWayMainTrip = () => {
  const { schedules } = useSelector(state => state?.schedule);

  return (
    <div
      className="grow flex flex-col bg-[url('/public/img/booking_page_img.png')] bg-no-repeat bg-cover bg-center bg-fixed"
      id="request-book"
    >
      <NavBar />
      <div className="flex flex-col">
        <RequestBook showTopSection={true} />
        <SearchResultsForTwoWayMainTrip
          results={schedules?.twoWayScheduleResponse?.firstTrip}
        />
      </div>
    </div>
  );
};

export default BookingResultsTwoWayMainTrip;
