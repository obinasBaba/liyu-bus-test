import { useState } from 'react';
import PostponeDate from './postponeDate';

const PostponeDates = ({ setTravelTimes }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  return (
    <div className="py-3 flex justify-around">
      {[
        {
          dateStr: 'Sat',
          dateNum: 10,
          travelTimes: [
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
          ],
        },
        {
          dateStr: 'Sun',
          dateNum: 10,
          travelTimes: [
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
          ],
        },
        {
          dateStr: 'Mon',
          dateNum: 10,
          travelTimes: [
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
          ],
        },
        {
          dateStr: 'Tue',
          dateNum: 10,
          travelTimes: [
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
          ],
        },
        {
          dateStr: 'Wed',
          dateNum: 10,
          travelTimes: [
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
          ],
        },
        {
          dateStr: 'Thu',
          dateNum: 10,
          travelTimes: [
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
            {
              startTime: '12:00 AM',
              endTime: '1:00 AM',
            },
          ],
        },
      ].map((date, index) => {
        return (
          <PostponeDate
            date={date}
            setTravelTimes={setTravelTimes}
            selected={selectedIndex === index}
            setSelectedIndex={setSelectedIndex}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default PostponeDates;
