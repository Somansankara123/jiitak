import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const { value } = e.target;
    if (!!value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
      setIsEmailValid(true);
      setEmail(value);
    } else {
      setIsEmailValid(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('メールアドレスを入力してください。'); 
      return;
    }

    if (!isEmailValid) {
      toast.error('有効なメールアドレスを入力してください。'); 
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success('指定されたメールアドレスにパスワードリセット用のURLを送信しました。');
      
      setTimeout(() => {
        navigate('/resetpassword');
      }, 1500); 
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F5F0]">
      <div className="w-full max-w-md p-8 space-y-4 bg-[#F8F5F0]">
        <h2 className="text-4xl text-center text-gray-800">パスワードリセット</h2>
        <h6 className="text-center">
          現在使用しているメールアドレスを入力してください。パスワードリセット用のURLをメールで送信します。
        </h6>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleEmailChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9500] ${!isEmailValid ? 'border-red-500 focus:ring-2' : 'border-gray-300'}`}
              placeholder="メールアドレスを入力してください"
            />
            {!isEmailValid && <p className="text-sm text-red-500">有効なメールアドレスを入力してください。</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`relative w-full px-4 py-2 mt-4 text-white rounded-lg ${isLoading ? "bg-[#FF9500] cursor-not-allowed" : "bg-[#FF9500] hover:bg-[#ff9500df]"}`}
          >
            <div className="flex items-center justify-center">
              {isLoading ? (
                <span className="loader w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
              ) : (
                '送信'
              )}
            </div>
          </button>
          <div className="w-full text-center mt-2">
            <Link to={'/'}><p>ログインページに戻る</p></Link>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-center" autoClose={2000} /> 
    </div>
  );
};

export default ForgotPassword;
