import React from 'react';

const InputField = ({ id, name, type, placeholder, value, onChange, Icon }) => (
  <div className="form-group mb-3">
    <label htmlFor={id} className="visually-hidden">
      {placeholder}
    </label>
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <Icon />
        </span>
      </div>
      <input
        id={id}
        className="form-control border-secondary"
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required
        aria-required="true"
        aria-label={`${placeholder} input`}
      />
    </div>
  </div>
);

export default InputField;
