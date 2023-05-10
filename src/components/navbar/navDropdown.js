import { useState } from 'react';
import i18Next from 'i18next';

const NavDropDown = ({ options }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('English');
  return (
    <div className="flex flex-col">
      <button
        class="text-white focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center"
        type="button"
        onClick={() => {
          setShowOptions(!showOptions);
        }}
      >
        {selectedOption}
        <svg
          class="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        className={`${
          showOptions ? '' : 'hidden'
        } z-10 bg-transparent border border-white rounded divide-y divide-gray-100 relative`}
      >
        <ul className="py-1 text-sm absolute">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                i18Next.changeLanguage(option.code);
                setSelectedOption(option.label);
                setShowOptions(false);
              }}
            >
              <a role="button" className="block py-2 px-2">
                {option.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavDropDown;
