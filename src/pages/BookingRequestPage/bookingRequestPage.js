import { useEffect } from 'react';
import RequestBook from '../../components/book/requestBook';
import {
  useBackgroundContext,
  useBackgroundContextSetter,
} from '../../components/context/backgroundContext';

const BookingRequestPage = () => {
  const homePageImg = useBackgroundContext();
  const backgroundSetter = useBackgroundContextSetter();
  useEffect(() => {
    // backgroundSetter("bg-[url('/public/img/background_image1.jpg')]");
  }, [homePageImg]);
  return (
    <div className="grow bg-black bg-opacity-40">
      <div className="flex flex-col">
        <RequestBook showTopSection={true} />
      </div>
    </div>
  );
};

export default BookingRequestPage;
