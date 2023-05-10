import LandingPageLabels from './landingPageLabels';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const LandingPageLabelsContainer = () => {
  const options = [
    {
      label: 'Search',
      onClick: () => {},
    },
    {
      label: 'Book',
      onClick: () => {},
    },
    {
      label: 'Go',
      onClick: () => {},
    },
  ];
  return (
    <div className=" w-full flex flex-col md:flex-row md:mt-2">
      {options.map((opt, index) => {
        if (index === options.length - 1) {
          return (
            <div key={index} className="shrink text-center">
              <LandingPageLabels label={opt.label} />
            </div>
          );
        }
        return (
          <div key={index} className="grow">
            <div className="flex flex-col items-center justify-center space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-end">
              <LandingPageLabels label={opt.label} />
              <div className="grow flex items-center justify-center">
                <ArrowForwardIosIcon
                  sx={{
                    color: '#FF6B1B',
                    fontWeight: 'bolder',
                    fontSize: '45px',
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default LandingPageLabelsContainer;
