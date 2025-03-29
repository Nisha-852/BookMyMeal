import React from 'react'

const FormText = ({label, className, rows, placeholder, notes, onChange}) => {
  return (
    <div>
         <div className="form-group">
              <label>{label}</label>
              <textarea
                className={className}
                rows={rows}
                placeholder={placeholder}
                value={notes}
                onChange={onChange}
              ></textarea>
            </div>
    </div>
  )
}

export default FormText
