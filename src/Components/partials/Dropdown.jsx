import React, { useState } from 'react';

const Dropdown = ({ title, options, fucn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    fucn({ target: { value } });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-full  max-w-48 lg:max-w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#1f1f1f] text-white py-3 px-4 rounded-lg flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#ff3d00] transition-colors duration-200 ease-in-out"
      >
        <span>{title}</span>
        <svg
          className={`w-5 h-5 ml-2 transform transition-transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute w-full mt-2 bg-[#1f1f1f] text-white rounded-lg shadow-lg overflow-hidden z-10">
          {options.map((option, i) => (
            <div
              key={i}
              onClick={() => handleSelect(option)}
              className="py-2 px-4 cursor-pointer hover:bg-[#ff3d00] hover:text-white transition-colors duration-200 ease-in-out"
            >
              {option.toUpperCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
