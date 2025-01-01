import React from 'react';
import { Form } from 'react-bootstrap';

const InputField = ({ id, name, type, placeholder, value, onChange, Icon }) => (
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
        value={value}
        onChange={onChange}
        required
      />
    </div>
  </Form.Group>
);

export default InputField;
