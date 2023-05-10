import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ActiveTrip = ({ activeTrip }) => {
  return (
    <div className="h-10 py-3 flex items-center justify-start">
      <div className="flex items-center justify-center space-x-1 text-sm">
        <span>{activeTrip.from}</span>
        <span>To</span>
        <span>{activeTrip.to}</span>
        <ArrowForwardIosIcon
          sx={{
            color: '#FF6B1B',
            fontWeight: 'bolder',
            fontSize: 'small',
          }}
        />
      </div>
    </div>
  );
};

export default ActiveTrip;
