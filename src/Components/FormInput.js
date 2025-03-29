import React from 'react';
import ErrorMessage from './ErrorMsg';

const FormInput = ({ label, type, name, value, onChange, error, placeholder, autoFocus,id,checked }) => (
  <div className="form-group">
    <label className="control-label">{label}</label>
    <div className="input-addon">
      <input
        className={`form-control ${error ? 'is-invalid' : ''}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        id={id}
        checked={checked}
      />

    </div>
    {error && <ErrorMessage message={error} />}
  </div>
);

export default FormInput;
