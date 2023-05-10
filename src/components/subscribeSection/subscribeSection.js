import PrimaryButton from '../button/primaryButton';

const SubscribeSection = () => {
  return (
    <div className="w-full bg-black bg-opacity-50 ">
      <div className="md:w-3/4 ml-auto">
        <div className="flex flex-col space-y-2 items-center md:flex-row md:justify-around">
          <div className="flex flex-col items-center py-3 space-y-2">
            <span className="text-2xl font-extrabold">
              Are you a service provider?
            </span>
            <span className="text-sm">Then join us on this new venture</span>
          </div>
          <div className="flex flex-col py-3 space-y-2">
            <PrimaryButton
              label={'Subscribe'}
              className="bgTransparent border border-[#FF6B1B] capitalize hover:bg-[#FF6B1B]"
            />
            <span className="text-xs">For service providers only</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
