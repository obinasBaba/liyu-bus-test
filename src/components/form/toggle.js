import { useEffect, useState } from 'react';

const Toggle = ({ label, onChange, name, defaultChecked = false, value }) => {
  const [checked, setChecked] = useState(defaultChecked);
  const onToggleChange = e => {
    setChecked(prevState => {
      return !prevState.valueOf();
    });
  };

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  return (
    <label
      for={name}
      className="inline-flex relative items-center cursor-pointer"
    >
      <input
        type="checkbox"
        checked={checked}
        id={name}
        name={name}
        className="sr-only peer"
        onChange={() => {
          onToggleChange();
          onChange();
        }}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF6B1B] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#FF6B1B] after:border-[#FF6B1B] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B1B]"></div>
      <span className="ml-3 text-sm text-white">{label}</span>
    </label>
  );
};

export default Toggle;
