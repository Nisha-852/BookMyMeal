import React from 'react';

const Checkbox = ({ label, name, checked, onChange }) => (
  <label className="custom-checkbox mb-0">
    <span className="checkbox__title">{label}</span>
    <input
      className="checkbox_s_input"
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
    />
    <span className="checkbox__checkmark"></span>
  </label>
);

export default Checkbox;
