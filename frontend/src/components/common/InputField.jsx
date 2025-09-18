import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const InputField = ({ id, name, type, placeholder, value, onChange, Icon, AppendIcon, onAppendIconClick }) => {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <Form.Group controlId={id} className='mb-3'>
      <div className='input-group'>
        {Icon && (
          <div className='input-group-prepend'>
            <span data-testid="input-icon" className='input-group-text'>
              <Icon />
            </span>
          </div>
        )}

        <Form.Control
          type={type}
          name={name}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          required
          autoComplete={name === 'password' ? 'current-password' : 'off'}
        />

        {AppendIcon && (
          <div className='input-group-append'>
            <span className='input-group-text' data-testid="append-icon" style={{ cursor: 'pointer' }} onClick={onAppendIconClick}>
              <AppendIcon />
            </span>
          </div>
        )}
      </div>
    </Form.Group>
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
};

export default InputField;
