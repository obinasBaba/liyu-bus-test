import Travel from './travel';
import searchResult from '../../components/json/searchResult.json';
import Input from '../../components/form/inputs';
import { useState } from 'react';
import PrimaryButton from '../../components/button/primaryButton';
import NavBar from '../../layout/TopNavBar/navbar';

const Travels = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [ticketResults, setTicketResults] = useState(null);
  console.log(searchResult);
  return (
    <div
      className="grow flex flex-col bg-[url('/public/img/booking_page_img.png')] bg-no-repeat bg-cover bg-center bg-fixed"
      id="request-book"
    >
      <NavBar />
      <div className="pt-10 w-full text-left bg-black">
        <div className="text-white w-3/4 mx-auto">
          <div className="flex flex-col space-y-2">
            <span className="pt-3 text-lg font-bold">Your Travels</span>
            <span className="text-sm pb-3">
              You can either postpone cancel or request refund here
            </span>
          </div>
          <div className="flex space-x-2">
            <Input
              label={'Ticket Number'}
              name="ticketNumber"
              onChange={e => {
                setTicketNumber(e.target.value);
              }}
              value={ticketNumber}
              width="full"
              inputClassName=""
              useMaterialInput={true}
            />
            <PrimaryButton
              label={'Search'}
              onClick={() => {
                setTicketResults(searchResult.slice(0, 1));
              }}
            />
          </div>
          <div className="mt-5 flex flex-col space-y-3">
            {ticketResults?.map((travel, index) => {
              return (
                <div className="" key={index}>
                  <Travel travelInfo={travel} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Travels;
