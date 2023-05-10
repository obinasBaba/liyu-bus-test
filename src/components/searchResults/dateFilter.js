const DateFilter = ({ date, activeIndex, index, onClick }) => {
  return (
    <div
      className={`filter ${activeIndex === index ? 'active' : ''} text-black`}
      onClick={onClick}
    >
      <span className="text-sm">{date.toDateString()}</span>
    </div>
  );
};

export default DateFilter;
