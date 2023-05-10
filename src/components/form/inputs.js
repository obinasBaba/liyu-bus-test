import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { createStyles } from '@mui/material';

const useStyles = createStyles(() => ({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
}));

const Input = ({
  label,
  name,
  type = 'text',
  onChange,
  value,
  className = '',
  width = null,
  inputClassName = '',
  error,
  disabled,
  touched,
  onBlur,
  prefix,
  useMaterialInput,
  ref,
}) => {
  const styles = useStyles();
  const [touchedInput, setTouchedInput] = useState(touched);

  useEffect(() => {
    console.log(ref);
    setTouchedInput(touched);
  }, [touched]);

  return useMaterialInput ? (
    <div
      className={`${width ? `w-${width}` : 'w-[300px]'}  ${className} ${
        styles.root
      }`}
    >
      <TextField
        variant="outlined"
        error={error}
        sx={{
          background: 'white',
          color: '#ff6b1b',
          width: '100%',
        }}
        type={type}
        size="small"
        id={name}
        label={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onBlur={onBlur}
        prefix={prefix}
        inputRef={ref}
        name={name}
      />
      {error && touchedInput && (
        <p style={{ color: 'red' }} className="p-2.5 py-2 font-light">
          {error}
        </p>
      )}
    </div>
  ) : (
    <div
      className={`${
        width ? `w-${width}` : 'w-[300px]'
      }  ${className} flex justify-start flex-col`}
    >
      <input
        className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${inputClassName}`}
        id={name}
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onBlur={onBlur}
      />
      {error && touchedInput && (
        <p style={{ color: 'red' }} className="p-2.5 py-2 font-light">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
