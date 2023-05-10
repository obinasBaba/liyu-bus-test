const InputWithLabel = ({
  inputLabel,
  name,
  type,
  onChange,
  value,
  labelText,
  error,
}) => {
  return (
    <div className="text-white">
      <label for={name} className="block text-sm">
        {labelText}
      </label>
      <input
        className="shadow appearance-none bg-transparent border border-x-0 border-t-0 w-full py-1 font-thin text-gray-300 text-xs leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        type="text"
        value={value}
        onChange={onChange}
      />
      {error && (
        <p style={{ color: 'red' }} className="p-1 py-1 font-light text-sm">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputWithLabel;
