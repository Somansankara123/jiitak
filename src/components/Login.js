import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from "../utils.js/UserContext";


const Login = () => {

  const {setLoginResponse} = useContext(UserContext)

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const navigate = useNavigate();

  const notify = (message) => {
    toast.error(message);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!email || !password) {
      notify('Please fill in both email and password!');
      return;
    }

    if (!isEmailValid || !isPasswordValid) {
      toast.error('Please enter valid email and password!');
      return;
    }

    setIsLoading(true);
    sessionStorage.setItem('email',email)
    setTimeout(() => {
      setIsLoading(false);
      
      
      toast.success('Login successful! Redirecting...');
      
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); 
      setLoginResponse(email)
    }, 1000); 
  };

  const validation = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setIsEmailValid(!!value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/));
      setEmail(value);
    }
    if (name === 'password') {
      setIsPasswordValid(
        !!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/)
      );
      setPassword(value);
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F5F0]">
      <div className="w-full max-w-md p-8 space-y-4 bg-[#F8F5F0]">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => validation(e)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9500] ${
                !isEmailValid ? 'border-red-500 focus:ring-2' : 'border-gray-300'
              }`}
              
            />
            {!isEmailValid && (
              <p className="text-sm text-red-500 mt-1">Please enter a valid email address.</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <div
              className={`flex items-center px-4 border rounded-lg focus-within:ring-2 focus-within:ring-[#FF9500] bg-white ${
                !isPasswordValid ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <input
                type={isVisible ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => validation(e)}
                className="flex-grow bg-transparent focus:outline-none placeholder-gray-500"
                id="password"
                
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
            {!isPasswordValid && (
              <p className="text-sm text-red-500 mt-1">
                Password must be at least 6 characters long, contain both uppercase and lowercase letters, at least one number, and one special character.
              </p>
            )}
          </div>

          <button
            onClick={handleClick}
            disabled={isLoading}
            className={`relative w-full px-4 py-2 mt-4 text-white rounded-2xl ${
              isLoading ? 'bg-[#FF9500] cursor-not-allowed' : 'bg-[#FF9500] hover:bg-[#ff9500df]'
            }`}
          >
            <div className="flex items-center justify-center">
              {isLoading ? (
                <span className="loader w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
              ) : (
                'Login'
              )}
            </div>
          </button>
          <div className="w-full text-center mt-2">
            <Link to={'/forgotpassword'}>
              <p>Forgot your password?</p>
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  )
}

export default Login