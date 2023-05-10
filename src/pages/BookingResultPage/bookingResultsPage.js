import { useSelector } from 'react-redux';
import SearchResults from '../../components/searchResults/searchResults';
import BookingSearchForm from './components/BookingSearchForm';
import Footer from '../../components/footer/footer';
import Booking from '../../scenes/BookingPage';

const BookingResultsPage = () => {
  const { schedules } = useSelector(state => state?.schedule);

  return <Booking />;

  return (
    <div className="grow flex flex-col mt-32" id="request-book">
      {/*<RequestBook showTopSection={true} />*/}

      {/*<BookingSearchForm/>*/}

      <SearchResults results={schedules?.schedules} />

      <Footer />
    </div>
  );
};

export default BookingResultsPage;
