import { useState } from 'react';
import { Formik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import TravelCard from '../card/travelCard';
import SeatSelection from '../seat/seatSelection';
import { setTravelDetail } from '../../redux/booking';

const SeatPicker = ({ showOptions, cancelShowOptions, searchResult }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
                mainTravel: {
                  schedule: searchResult,
                  ...values?.selectionDetails,
                },
              }),
            );
            navigate('/travelDetail');
          }}
        >
          {formicProps => {
            const { setFieldValue, handleSubmit, values } = formicProps;

            return (
              <form className="flex w-full">
                <SeatSelection
                  handleSubmit={handleSubmit}
                  formType={'main'}
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

const SearchResult = ({ schedule }) => {
  const [showOptions, setShowOptions] = useState(false);
  const request = useSelector(state => state?.search?.request);
  return (
    <>
      <TravelCard
        buttonText={'BOOK'}
        showSeats={true}
        disabled={false}
        setShowOptions={() => setShowOptions(!showOptions)}
        searchResult={schedule}
      />
      {showOptions && (
        <SeatPicker
          showOptions={showOptions}
          cancelShowOptions={() => setShowOptions(false)}
          searchResult={schedule}
        />
      )}
    </>
  );
};

export default SearchResult;
