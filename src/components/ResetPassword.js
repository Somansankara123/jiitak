import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [cpassIsVisible, setCpassIsVisible] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate()

  const validatePassword = (password) => {
    
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
      setPasswordError('Password is required.');
    } else if (!validatePassword(value)) {
      setPasswordError(
        'Password must be at least 6 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.'
      );
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error('Please fill out both password fields.');
      return;
    }

    if (passwordError || confirmPasswordError) {
      toast.error('Please resolve the errors before submitting.');
      return;
    }

    
    setTimeout(() => {
      toast.success('Password changed successfully!');
      setTimeout(() => {
        navigate('/'); 
      }, 1500);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#F8F5F0]">
      <div className="w-full max-w-md p-8 space-y-4 bg-[#F8F5F0]">
        <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <div
              className={`flex items-center px-4 border ${
                passwordError ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus-within:ring-2 focus-within:ring-[#FF9500] focus-within:border-transparent bg-white`}
            >
              <input
                type={isVisible ? 'text' : 'password'}
                id="password"
                
                className="flex-grow bg-transparent focus:outline-none placeholder-gray-500"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="p-2 focus:outline-none"
                onClick={() => setIsVisible(!isVisible)}
                aria-label={isVisible ? 'Hide password' : 'Show password'}
              >
                {isVisible ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
              </button>
            </div>
            {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
          </div>

          
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div
              className={`flex items-center px-4 border ${
                confirmPasswordError ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus-within:ring-2 focus-within:ring-[#FF9500] focus-within:border-transparent bg-white`}
            >
              <input
                type={cpassIsVisible ? 'text' : 'password'}
                id="confirm-password"
                
                className="flex-grow bg-transparent focus:outline-none placeholder-gray-500"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <button
                type="button"
                className="p-2 focus:outline-none"
                onClick={() => setCpassIsVisible(!cpassIsVisible)}
                aria-label={cpassIsVisible ? 'Hide password' : 'Show password'}
              >
                {cpassIsVisible ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
              </button>
            </div>
            {confirmPasswordError && <p className="text-sm text-red-500">{confirmPasswordError}</p>}
          </div>

          
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-[#FF9500] rounded-2xl hover:bg-[#ff9500df]"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
};

export default ResetPassword;