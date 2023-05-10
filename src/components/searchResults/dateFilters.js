import { useState } from 'react';
import DateFilter from './dateFilter';
import './style.css';
const DateFilters = ({ relatedDates }) => {
  const [activeDateIndex, setActiveIndex] = useState(1);
  return (
    <div className="filters--container text-black">
      {relatedDates.map((date, index) => {
        return (
          <DateFilter
            date={date}
            key={index}
            onClick={() => setActiveIndex(index)}
            activeIndex={activeDateIndex}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default DateFilters;
