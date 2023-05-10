import { useState } from 'react';
import TravelCard from '../../components/card/travelCard';
import TravelOptions from './travelOptions';

const Travel = ({ travelInfo }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="flex flex-col">
      <TravelCard
        disabled={travelInfo.disabled}
        searchResult={travelInfo}
        setShowOptions={() => setShowOptions(!showOptions)}
      />
      {showOptions && <TravelOptions show={showOptions} />}
    </div>
  );
};

export default Travel;
