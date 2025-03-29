
import React, { useState } from 'react';
import axiosInstance from '../Axios';
import '../styles/ChangePassword.css';
import FormInput from './FormInput';

const ChangePassword = ({ callback }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });
    const [errors, setErrors] = useState({});

    const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const validateForm = () => {
        const validationErrors = {};
// optimized it 
        if (!currentPassword) validationErrors.currentPassword = 'Current password is required';
        if (!newPassword) validationErrors.newPassword = 'New password is required';
        if (!confirmPassword) validationErrors.confirmPassword = 'Confirm password is required';
        if (newPassword !== confirmPassword) {
            validationErrors.confirmPassword = 'New password and confirm password must match';
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const { data } = await axiosInstance.post('/users/admin/change-password', {
                    email: localStorage.getItem('userEmail'),
                    oldPassword: currentPassword, newPassword: newPassword
                });
                console.log(data);
                alert('Password changed successfully!');
                callback();
            } catch (error) {
                console.error(error);
                alert(error.response?.data?.message || 'An error occurred');
            }
        }
    };

    return (
        <div className="change-password-container">
            <form className="change-password-form" onSubmit={handleSubmit}>
                <h2 className="form-title">Change Password</h2>
                <p className="form-subtitle">
                    Enter your current and new passwords to update your credentials.
                </p>
                        <FormInput
                        label={'Current Password'}
                            type={showPassword.currentPassword ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className={`form-input ${errors.currentPassword ? 'error' : ''}`}
                            placeholder="Enter current password"
                            error={errors.currentPassword}
                        />
                        <span
                            className={`toggle-password ${showPassword.currentPassword ? 'show' : ''}`}
                            onClick={() => togglePasswordVisibility('currentPassword')}
                        ></span>

                        <FormInput
                              label={'New Password'}
                            type={showPassword.newPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={`form-input ${errors.newPassword ? 'error' : ''}`}
                            placeholder="Enter new password"
                            error={errors.newPassword }
                        />
                        <span
                            className={`toggle-password ${showPassword.newPassword ? 'show' : ''}`}
                            onClick={() => togglePasswordVisibility('newPassword')}
                        ></span>

                        <FormInput
                             label={'Confirm Password'}
                            type={showPassword.confirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                            placeholder="Confirm new password"
                            error={errors.confirmPassword}
                        />
                        <span
                            className={`toggle-password ${showPassword.confirmPassword ? 'show' : ''}`}
                            onClick={() => togglePasswordVisibility('confirmPassword')}
                        ></span>

                <button type="submit" className="form-button">
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
