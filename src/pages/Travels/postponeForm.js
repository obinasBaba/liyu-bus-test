import { useState } from 'react';
import PostponeDates from './postponeDates';
import PostponeTime from './postponeTime';

const PostponeForm = ({ onSelect }) => {
  const [travelTimes, setTravelTimes] = useState([]);
  return (
    <div className="flex flex-col">
      <h2>Select a Departure date</h2>
      <form className="flex flex-col">
        <div className="w-full ">
          <PostponeDates setTravelTimes={setTravelTimes} />
        </div>
        {travelTimes.length > 0 && (
          <>
            <h2>Recommended Travel Time</h2>
            <div className="w-full grid grid-cols-2 ">
              {travelTimes.map(travelTime => (
                <PostponeTime time={travelTime} onSelect={onSelect} />
              ))}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default PostponeForm;
