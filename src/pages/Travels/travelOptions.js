import { useState } from 'react';
import PrimaryButton from '../../components/button/primaryButton';
import Modal from '../../components/modal/modal';
import SeatSelectionForPostpone from '../../components/seat/seatSelectionForPostpone';
import PostponeForm from './postponeForm';

const TravelOptions = ({ show }) => {
  const [showPostponeModal, setShowPostponeModal] = useState(false);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [postponeSeats, setPostponeSeatsInfo] = useState(null);
  return (
    <>
      {!showSeatSelection && (
        <div className={`flex space-x-2 mb-1 ${show ? '' : 'hidden'}`}>
          <PrimaryButton
            label={'Postpone'}
            onClick={() => {
              setShowPostponeModal(true);
            }}
            className="rounded-none"
          />
          <PrimaryButton
            label={'Refund'}
            onClick={() => {}}
            className="rounded-none"
          />
          <PrimaryButton
            label={'Cancel'}
            onClick={() => {}}
            className="rounded-none"
          />
        </div>
      )}
      {showSeatSelection && (
        <SeatSelectionForPostpone
          handleSubmit={val => {
            setPostponeSeatsInfo(val);
          }}
          occupiedSeats={[]}
          reservedSeats={[]}
          price={100}
        />
      )}
      <Modal
        show={showPostponeModal}
        closeModal={() => {
          setShowPostponeModal(false);
        }}
        modalContainerClassName={'p-3'}
        showBackButton={true}
      >
        <PostponeForm
          onSelect={dateAndTime => {
            setShowSeatSelection(true);
            setShowPostponeModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default TravelOptions;
