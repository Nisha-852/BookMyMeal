import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/images/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastStyle } from '../constants/generalConsts';
import FormInput from '../Components/FormInput';
import Checkbox from '../Components/CheckBox';
import Button from '../Components/Button';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = ({ target: { name, value, type, checked } }) => {
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const formErrors = {};
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      formErrors.email = 'Please enter a valid email address';
      isValid = false;
      toast.error('Invalid email address', toastStyle);
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(formData.password)) {
      formErrors.password =
        'Password must be at least 8 characters, with at least one uppercase, one lowercase, one digit, and one special character';
      toast.error('Password must meet security requirements', toastStyle);
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { data } = await axios.post('http://localhost:5000/api/users/login', {
          email: formData.email,
          password: formData.password,
        });

        console.log(data);  

        const { email, token, id } = data;

        if (!email || !token) {
          throw new Error('Invalid response from server');
        }

        localStorage.setItem('userEmail', email);
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);

        toast.success('Login successful', toastStyle);
        
        setTimeout(() => navigate('/calendar'), 1000);
      } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        toast.error(error.response?.data.message || 'Login failed', toastStyle);
      }
    }
  };

  return (
    <>
      <section className="login-content">
        <div className="login-content-lt" />
        <div className="login-content-rt">
          <div className="login-box">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="logo-wrapper">
                <img src={logo} alt="Rishabh Software" />
                <span>Meal Facility</span>
              </div>
              <h3 className="login-head">Sign in to your account</h3>
              <p className="login-text">Enter your credentials to access your account.</p>

              <FormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                placeholder="example@domain.com"
                autoFocus
              />

              <FormInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                placeholder="Enter password"
              />

              <div className="d-flex align-items-center justify-content-between">
                <div className="form-group mb-0">
                  <Checkbox
                    label="Remember Me"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                </div>

              </div>

              <div className="form-group btn-container">
                <Button type="submit" className="btn btn-xl btn-primary" buttonName="Sign in" />
              </div>
            </form>
          </div>
        </div>
      </section>

      <ToastContainer />
    </>
  );
};

export default Login;
