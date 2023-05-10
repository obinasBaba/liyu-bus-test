import { useState } from 'react';
import { useSelector } from 'react-redux';
import PrimaryButton from '../../components/button/primaryButton';
import Modal from '../../components/modal/modal';
import PaymentMethod from '../../components/payment/paymentMethod';
import DetailInformation from './DetailInformation';
import PassengerDetail from './passengerDetail';

const TravelDetail = () => {
  const [show, setShow] = useState(false);
  const { travelDetail } = useSelector(state => state?.booking);

  return (
    <div className="w-full bg-[#131313] h-screen text-white pb-4">
      <div className="w-9/12 h-full mx-auto h-screen flex pt-8 divide-x divide-dashed">
        <div className="w-2/3 flex text-left pr-7 justify-center">
          <div className="w-full flex flex-col justify-between">
            <DetailInformation travelDetail={travelDetail} setShow={setShow} />
          </div>
        </div>
        <div className="w-1/3 text-left pl-7">
          <PassengerDetail seatNumbers={travelDetail.seatNumbers} />
        </div>
      </div>
      <Modal
        show={show}
        closeModal={() => {
          setShow(false);
        }}
        showBackButton={true}
      >
        <PaymentMethod />
      </Modal>
    </div>
  );
};

export default TravelDetail;
