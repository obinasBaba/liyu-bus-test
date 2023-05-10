import { useNavigate } from 'react-router-dom';

const PaymentMethod = ({ onSuccess }) => {
  const navigateToTicketDetails = () => {
    onSuccess();
  };
  return (
    <div className="w-10/12 mx-auto mb-10">
      <div className="flex flex-col">
        <span className="text-[#FF6B1B] text-md">Payment Method</span>
        <span className="text-xs my-1">Select Your Payment Preference</span>
        <div className="mt-6 w-full h-20 grid grid-cols-4 gap-4">
          <img width={100} height={100} src="/img/telebirr.jpg" />
          {/* <div
            className="bg-white text-black flex items-center justify-center"
            style={{ cursor: "pointer" }}
            onClick={navigateToTicketDetails}
          >
            <label>Telebirr</label>
          </div> */}
          <div
            className="bg-white text-black flex items-center justify-center"
            style={{ cursor: 'pointer' }}
            onClick={navigateToTicketDetails}
          >
            <img width={100} height={100} src="/img/cbe.jpg" />

            {/* <label>CBE</label> */}
          </div>
          <div
            className="bg-white text-black flex items-center justify-center"
            style={{ cursor: 'pointer' }}
            onClick={navigateToTicketDetails}
          >
            <img width={100} height={100} src="/img/awash.jpg" />

            {/* <label>Awash</label> */}
          </div>
          <div
            className="bg-white text-black flex items-center justify-center"
            style={{ cursor: 'pointer' }}
            onClick={navigateToTicketDetails}
          >
            <img width={100} height={100} src="/img/amole.jpg" />

            {/* <label>Amole</label> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
