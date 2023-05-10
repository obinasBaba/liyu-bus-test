const PostponeTime = ({ time, onSelect }) => {
  return (
    <div
      className="p-3 m-2 bg-[#979797] text-white hover:bg-[#ff6b1b] cursor-pointer rounded flex items-center justify-center"
      onClick={() => onSelect(time)}
    >
      <span>{time?.startTime}</span>
      <span className="px-1"> - </span>
      <span>{time?.endTime}</span>
    </div>
  );
};

export default PostponeTime;
