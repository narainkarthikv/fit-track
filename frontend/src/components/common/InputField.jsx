import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const InputField = ({ id, name, type, placeholder, value, onChange, Icon }) => {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Form.Group controlId={id} className='mb-3'>
      <div className='input-group'>
        {Icon && (
          <div className='input-group-prepend'>
            <span className='input-group-text'>
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
        />
      </div>
    </Form.Group>
  );
};

export default InputField;
