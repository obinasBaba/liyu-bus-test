import { InputAdornment, TextField } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useEffect } from 'react';
const InputAmharicDate = ({
  label,
  name,
  type = 'text',
  className = '',
  width = null,
  inputClassName = '',
  error,
  disabled,
  useMaterialInput,
  onChange,
  value = '',
}) => {
  const clickOnDate = () => {
    const el = document.getElementById(name);
    el.focus();
  };

  useEffect(() => {
    const customEvent = new Event('mountDatePicker');
    window.dispatchEvent(customEvent);
  }, []);
  return useMaterialInput ? (
    <div className={`${width ? `w-${width}` : 'w-[300px]'}  ${className}`}>
      <TextField
        variant="outlined"
        error={error}
        className={`rounded `}
        inputProps={{
          className: 'popupDatepicker',
        }}
        sx={{
          background: 'white',
          color: '#ff6b1b',
          width: '100%',
        }}
        name={name}
        label={label}
        onChange={e => {
          onChange(e);
        }}
        value={value}
        id={name}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={() => {
                clickOnDate();
              }}
              sx={{
                cursor: 'pointer',
              }}
            >
              <CalendarTodayIcon />
            </InputAdornment>
          ),
        }}
        disabled={disabled}
      />
    </div>
  ) : (
    <div
      className={`${
        width ? `w-${width}` : 'w-[300px]'
      }  ${className} flex justify-start flex-col h-[50px]`}
    >
      <input
        className={`appearance-none border rounded w-full h-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline popupDatepicker ${inputClassName}`}
        type={type}
        placeholder={label}
        disabled={disabled}
        name={name}
      />
      {error && (
        <p style={{ color: 'red' }} className="p-2.5 py-2 font-light">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputAmharicDate;
