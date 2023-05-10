const PostponeDate = ({
  date,
  setTravelTimes,
  index,
  selected,
  setSelectedIndex,
}) => {
  return (
    <div
      className={`p-3 m-2 border border-[#ff6b1b] cursor-pointer rounded flex flex-col items-center justify-center min-w-[86px] hover:bg-[#ff6b1b] ${
        selected ? 'bg-[#ff6b1b]' : ''
      }`}
      onClick={() => {
        setTravelTimes(date.travelTimes);
        setSelectedIndex(index);
      }}
    >
      <span className="pb-1">{date?.dateStr}</span>
      <span>{date?.dateNum}</span>
    </div>
  );
};

export default PostponeDate;
