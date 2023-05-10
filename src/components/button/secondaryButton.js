const SecondaryButton = ({ label, onClick, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-block px-7 py-3 bg-[#979797] rounded text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#FF6B1B]-700 hover:shadow-lg focus:bg-[#FF6B1B]-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#FF6B1B]-800 active:shadow-lg transition duration-150 ease-in-out ${className}`}
    >
      {label}
    </button>
  );
};

export default SecondaryButton;
