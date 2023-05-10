import { ErrorMessage } from 'formik';

const Input2 = ({
  label,
  name,
  type = 'text',
  onChange,
  value,
  className = '',
  width = null,
  inputClassName = '',
  title,
  error,
  touched,
}) => {
  return (
    <div className={`${className}`}>
      <label>{title}</label>
      <input
        className={`bg-transparent border border-gray-300 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-2 ${inputClassName}`}
        id={name}
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
      />
      {error && (
        <p style={{ color: 'red' }} className="p-2.5 py-2 font-light">
          {error}
        </p>
      )}
      <ErrorMessage
        name={name}
        render={msg => {
          msg && (
            <p style={{ color: 'red' }} className="p-2.5 py-2 font-light">
              {msg}
            </p>
          );
        }}
      ></ErrorMessage>
    </div>
  );
};

export default Input2;
