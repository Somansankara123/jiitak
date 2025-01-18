import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);

  const navigate = useNavigate(); // Initialize navigate

  // Email Validation
  const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    return regex.test(value);
  };

  // Password Validation
  const validatePassword = (value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return regex.test(value);
  };

  // username validation
  const validateUsername = (value) => {
    return value.trim().length > 0;
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (validateUsername(value)) {
      setIsUsernameValid(true);
    } else {
      setIsUsernameValid(false);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (validateEmail(value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (validatePassword(value)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are valid
    if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
      toast.error("Please fill the form");
      return;
    }

    toast.success("Registration successful!");

    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate('/');
    }, 2000); // 2 seconds delay before redirection
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F5F0]">
      <div className="w-full max-w-md p-8 space-y-4 bg-[#F8F5F0]">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Username section */}
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className={`w-full px-4 py-2 border ${!isUsernameValid ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9500]`}
              
            />
            {!isUsernameValid && <p className="text-sm text-red-500">Username is required.</p>}
          </div>
          {/* Email section */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-4 py-2 border ${!isEmailValid ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9500]`}
              
            />
            {!isEmailValid && <p className="text-sm text-red-500">Please enter a valid email address.</p>}
          </div>

          {/* Password section */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center px-4 border rounded-lg focus-within:ring-2 focus-within:ring-[#FF9500] focus-within:border-transparent bg-white">
              <input
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className={`flex-grow bg-transparent focus:outline-none placeholder-gray-500 ${!isPasswordValid ? 'border-red-500' : 'border-gray-300'}`}
                id="password"
                
              />
              <button
                type="button"
                className="p-2 focus:outline-none"
                onClick={() => setIsVisible(!isVisible)}
                aria-label={isVisible ? "Hide password" : "Show password"}
              >
                {isVisible ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
              </button>
            </div>
            {!isPasswordValid && (
              <p className="text-sm text-red-500">
                Password must be at least 6 characters long, contain both uppercase and lowercase letters, at least one number, and one special character.
              </p>
            )}
          </div>

          
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-[#FF9500] rounded-2xl hover:bg-[#ff9500df]"
          >
            Register
          </button>
          <div className="w-full text-center mt-2">
            <Link to={'/'}> <p> Already have an account? login</p></Link>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
};

export default Register;