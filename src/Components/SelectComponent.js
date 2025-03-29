import React from 'react';

const SelectComponent = ({ options, value, onChange, className, placeholder }) => {
  return (
   
    <select value={value} onChange={onChange} className={className}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

  );
};

export default SelectComponent;
