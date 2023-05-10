import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { setPassengersDetails } from '../../../redux/booking';
import Modal from '../../../components/modal/modal';
import PaymentMethod from '../../../components/payment/paymentMethod';
import { requestBook } from '../../../actions/bookings';
import PassengerDetailForm from './PassengerDetailForm';
import './traveldetial.scss';

const TravelDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { travelDetail } = useSelector(state => state?.booking);
  const [main, setMain] = useState(null);
  const { request } = useSelector(state => state?.search);

  const [returnSeat, setReturnSeat] = useState(null);
  const [detailType, setDetailType] = useState('main');

  const showModal = () => {
    setShow(true);
  };

  const onSubmit = passengersDetails => {
    showModal();

    if (request.oneTimeTrip) {
      // call the api to send the request
      // set Return data from main
      showModal();
      setMain(passengersDetails);
      // dispatch(setPassengersDetails(passengersDetails));
    } else {
      // call the api to send the request
      travelDetail && showModal();
    }
  };

  return (
    <div className="grow flex flex-col  td_container">
      {/* <RouteDetail/>

            <Divider/>*/}

      <PassengerDetailForm
        seatNumbers={[20, 30]}
        showModal={showModal}
        setMain={setMain}
        main={main}
        returnSeat={returnSeat}
        setReturnSeat={setReturnSeat}
        detailType={detailType}
        handleSubmit={onSubmit}
        parentValues={{ main, returnSeat }}
      />

      <div className="flex flex-col">
        <div className="grow w-full text-white pb-4">
          <div className="w-9/12 mx-auto pt-8"></div>
          <Modal
            show={show}
            closeModal={() => {
              setShow(false);
            }}
            showBackButton={true}
          >
            <PaymentMethod
              onSuccess={() => {
                const bookingDetails = {
                  travelDetail,
                  passengersDetails: main,
                };
                console.log(bookingDetails);
                requestBook(dispatch, bookingDetails, navigate);
              }}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default TravelDetail;
