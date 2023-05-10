import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const CustomSelect = ({
  label,
  inputLabel,
  name,
  onChange,
  options = [],
  error,
  value,
  transparent,
  smallError,
  fullBorder = true,
  compact = false,
  useMaterialSelect,
  disabled,
  onBlur,
  prefix,
  touched,
  ref,
}) => {
  return useMaterialSelect ? (
    <FormControl fullWidth size="small">
      <InputLabel id="demo-simple-select-label" size="small">
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        sx={{
          width: '100%',
        }}
        size="small"
        name={name}
        value={value}
        label={label}
        onChange={e => {
          onChange(e);
        }}
        // className={`${transparent ? "bg-transparent" : "bg-white"} `}
        error={error}
        disabled={disabled}
        onBlur={onBlur}
        prefix={prefix}
        ref={ref}
      >
        {options.map((eachOption, index) => {
          return (
            <MenuItem
              key={index}
              value={eachOption.value}
              selected={value === eachOption.value}
            >
              {eachOption.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  ) : (
    <div className="bg-transparent">
      <label for={name} className="text-sm">
        {label}
      </label>
      <select
        id={name}
        onChange={onChange}
        className={`${
          transparent ? 'bg-transparent' : 'bg-white'
        } text-white appearance-none border rounded ${
          !fullBorder && 'border-x-0 border-t-0 '
        }rounded w-full ${
          compact ? 'py-2' : 'p-2.5 py-2  mt-2'
        } leading-tight focus:outline-none focus:shadow-outline font-thin text-gray-300 sm:text-sm`}
      >
        {options.map((eachOption, index) => {
          return (
            <option
              key={index}
              value={eachOption.value}
              className="text-[#FF6B1B] bg-black font-thin"
              selected={value === eachOption.value}
            >
              {eachOption.label}
            </option>
          );
        })}
      </select>
      {error && touched && (
        <p
          style={{ color: 'red' }}
          className={`${
            smallError ? 'p-1 py-1 text-sm' : 'p-2.5 py-2'
          }  font-light`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomSelect;
