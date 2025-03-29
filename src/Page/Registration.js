import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import FormInput from '../Components/FormInput';
import Button from '../Components/Button';
import axios from 'axios';
import checkimg from '../assets/images/checked.png'

const Registration = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname:'',
    email: '',
    phone: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    firstname: '',
    lastname:'',
    email: '',
    phone: '',
  });

  const [successPopup, setSuccessPopup] = useState(false); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    let valid = true;
    let errors = {};
// constant
    const validationRules = {
      firstname: {
        test: formData.firstname,
        message: 'firstname is required',
        
      },
      lastname: {
        test: formData.lastname,
        message: 'lastname is required',
        
      },
     
      email: {
        test: formData.email.trim() !== '' && /\S+@\S+\.\S+/.test(formData.email),
        message: formData.email.trim() === '' ? 'Email is required' : 'Email is invalid',
      },
      phone: {
        test: formData.phone.trim() !== '' && /^\d{10}$/.test(formData.phone),
        message: formData.phone.trim() === '' ? 'Phone number is required' : 'Phone number is invalid',
      },
    };

    Object.keys(validationRules).forEach((field) => {
      if (!validationRules[field].test) {
        errors[field] = validationRules[field].message;
        valid = false;
      }
    });

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validate()) {
      try {
        const { data } = await axios.post('http://localhost:5000/api/users/register', formData);
        console.log('User registered:', data);
  
        setSuccessPopup(true);
        setFormData({ firstname: '',lastname: '', email: '', phone: '', rememberMe: false });
  
        setTimeout(() => {
          setSuccessPopup(false);
          navigate('/');
        }, 3000);
      } catch (error) {
        if (error.response && error.response.data.errors) {
          const backendErrors = {};
          error.response.data.errors.forEach((err) => {
            backendErrors[err.param] = err.msg;
          });
          setErrors(backendErrors); 
        } else {
          console.error('Error:', error);
        }
      }
    }
  };
  
  return (
    <div>
      <div className="login-content">
        <div className="login-content-lt"></div>
        <div className="login-content-rt">
          <div className="login-box">
            <form className="login-form" onSubmit={handleSubmit}>
              <h3 className="login-head">Register Your Account</h3>
              <p className="login-text">Enter your details to create an account.</p>

              <FormInput
                label="First Name"
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                error={errors.firstname}
                placeholder="Robert Smith"
              />
                <FormInput
                label="Last Name"
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                error={errors.lastname}
                placeholder="Robert Smith"
              />
              <FormInput
                label='Email'
                className="form-control"
                type="text"
                name="email"
                placeholder="example@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <FormInput
                label='Phone Number'
                className="form-control"
                type="text"
                name="phone"
                placeholder="1234567890"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />

              <div className="form-group btn-container">
                <Button buttonName='submit' className="btn btn-xl btn-primary" type="submit"/>
              </div>
            </form>
          </div>
        </div>
      </div>

      {successPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img className='checkicon' src={checkimg} alt='check'/>
            <h2>🎉 Congratulations!</h2>
            <p>Registration successful!...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;

