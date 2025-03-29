import React from 'react'

const Button = ({ className, type, buttonName, data, aria ,onClick,key}) => {
  return <button 
   className={className} 
   data-dismiss={data} 
   aria-label={aria}
   onClick={onClick}
   key={key}
   type={type}>{buttonName}</button>
}

export default Button
