import PrimaryButton from '../button/primaryButton';
import LandingPageLabelsContainer from './landingPageLabelsContainer';

const LandingPageContent = ({ scrollToBooking }) => {
  return (
    <div className="grow flex items-start my-3 md:mt-10 justify-center">
      <div className="w-1/2 md:w-3/4 min-h-3/4 flex flex-col  space-y-3 md:items-start md:space-y-0 pt-2 md:pt-10 ">
        <div className="w-max md:w-11/12">
          <LandingPageLabelsContainer />
        </div>
        <div className="text-lg font-bold my-3">For Your Comfort</div>
        <PrimaryButton
          label={'Book Now'}
          onClick={scrollToBooking}
          className="w-[200px]"
        />
        <span
          className="text-xs font-light mt-1 text-grey-50"
          style={{
            fontWeight: 100,
          }}
        >
          For Passengers Only
        </span>
      </div>
    </div>
  );
};

export default LandingPageContent;
