import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setIsPasswordValid(
      !!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/)
    );
    setPassword(value);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setIsConfirmPasswordValid(value === password);
    setConfirmPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error('すべての項目を入力してください。');
      return;
    }

    if (!isPasswordValid) {
      toast.error('パスワードは必要な条件を満たしていません。');
      return;
    }

    if (!isConfirmPasswordValid) {
      toast.error('パスワードが一致しません。');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success('パスワードのリセットに成功しました！リダイレクト中...');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F5F0]">
      <div className="w-full max-w-md p-8 space-y-4 bg-[#F8F5F0]">
        <h2 className="text-4xl text-center text-gray-800">新しいパスワードを設定</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              新しいパスワード
            </label>
            <input
              type="password"
              id="password"
              onChange={handlePasswordChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9500] ${
                !isPasswordValid ? 'border-red-500 focus:ring-2' : 'border-gray-300'
              }`}
              placeholder="新しいパスワードを入力"
            />
            {!isPasswordValid && (
              <p className="text-sm text-red-500">
                パスワードは最低6文字で、大文字、小文字、数字、特殊文字を含める必要があります。
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">
              パスワードを確認
            </label>
            <input
              type="password"
              id="confirmPassword"
              onChange={handleConfirmPasswordChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9500] ${
                !isConfirmPasswordValid ? 'border-red-500 focus:ring-2' : 'border-gray-300'
              }`}
              placeholder="もう一度パスワードを入力"
            />
            {!isConfirmPasswordValid && (
              <p className="text-sm text-red-500">パスワードが一致しません。</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`relative w-full px-4 py-2 mt-4 text-white rounded-lg ${
              isLoading ? 'bg-[#FF9500] cursor-not-allowed' : 'bg-[#FF9500] hover:bg-[#ff9500df]'
            }`}
          >
            <div className="flex items-center justify-center">
              {isLoading ? (
                <span className="loader w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
              ) : (
                'パスワードをリセット'
              )}
            </div>
          </button>
        </form>
      </div>
      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
};

export default ResetPassword;
