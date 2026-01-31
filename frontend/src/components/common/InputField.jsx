import { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';

const InputField = ({
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  Icon,
  AppendIcon,
  onAppendIconClick,
  error = false,
  helperText = '',
  fullWidth = true,
  required = false,
}) => {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <TextField
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      fullWidth={fullWidth}
      required={required}
      error={error}
      helperText={helperText}
      autoComplete={name === 'password' ? 'current-password' : 'off'}
      data-testid={`input-field-${id}`}
      InputProps={{
        startAdornment: Icon ? (
          <InputAdornment position="start" data-testid="input-icon">
            <Icon />
          </InputAdornment>
        ) : null,
        endAdornment: AppendIcon ? (
          <InputAdornment
            position="end"
            onClick={onAppendIconClick}
            style={{ cursor: 'pointer' }}
            data-testid="append-icon"
          >
            <AppendIcon />
          </InputAdornment>
        ) : null,
      }}
      sx={{ mb: 2 }}
    />
  );
};

InputField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  Icon: PropTypes.elementType,
  AppendIcon: PropTypes.elementType,
  onAppendIconClick: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
};

export default InputField;
