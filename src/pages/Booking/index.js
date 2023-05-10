import { useSelector } from 'react-redux';
import Booking from '../../scenes/BookingPage';
import Footer from '../../components/footer/footer';

const BookingResultsPage = () => {
  const { schedules } = useSelector(state => state?.schedule);

  return (
    <>
      <Booking />
    </>
  );
};

export default BookingResultsPage;
