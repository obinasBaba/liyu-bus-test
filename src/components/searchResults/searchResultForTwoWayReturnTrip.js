import { useState } from 'react';
import { Formik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import TravelCard from '../card/travelCard';
import SeatSelection from '../seat/seatSelection';
import { setTravelDetail } from '../../redux/booking';

const SearchResultForTwoWayReturnTrip = ({ searchResult }) => {
  const [showOptions, setShowOptions] = useState(false);
  const request = useSelector(state => state?.search?.request);
  return (
    <>
      <TravelCard
        buttonText={'BOOK'}
        showSeats={true}
        disabled={false}
        setShowOptions={() => setShowOptions(!showOptions)}
        searchResult={searchResult}
        request={request}
      />
      {showOptions && (
        <OptionsComponent
          showOptions={showOptions}
          cancelShowOptions={() => setShowOptions(false)}
          searchResult={searchResult}
        />
      )}
    </>
  );
};

const OptionsComponent = ({ showOptions, cancelShowOptions, searchResult }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { travelDetail } = useSelector(state => state?.booking);

  console.log(travelDetail);

  return (
    showOptions && (
      <div className="mb-2 bg-[#696868]">
        <div className="flex w-full justify-end pr-2 pt-2">
          <span onClick={cancelShowOptions} style={{ cursor: 'pointer' }}>
            <CloseIcon />
          </span>
        </div>
        <Formik
          initialValues={{
            selectionDetails: null,
          }}
          onSubmit={values => {
            dispatch(
              setTravelDetail({
                mainTravel: travelDetail.mainTravel,
                returnTravel: {
                  schedule: searchResult,
                  ...values?.selectionDetails,
                },
              }),
            );
            navigate('/travelDetailForTwoWayTrip');
          }}
        >
          {({ setFieldValue, handleSubmit, values }) => {
            return (
              <form className="flex w-full">
                <SeatSelection
                  handleSubmit={handleSubmit}
                  formType={'return'}
                  schedule={searchResult}
                  setSeatSelection={selectionDetails => {
                    setFieldValue('selectionDetails', selectionDetails);
                  }}
                />
              </form>
            );
          }}
        </Formik>
      </div>
    )
  );
};

export default SearchResultForTwoWayReturnTrip;
