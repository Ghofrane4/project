import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/superadmins/reset-password`, {
        token,
        password
      });
      setMessage(response.data.message);
      setTimeout(() => navigate('/auth/sign-in')); // Redirect to login after 5 seconds
    } catch (err) {
      console.error('Error:', err);
      if (err.response) {
        setError(err.response.data.message || 'Something went wrong');
      } else {
        setError('Network error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Reset Password
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your new password and confirm it.
        </p>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        <form onSubmit={handleResetPassword}>
          {/* New Password */}
          <div className="mb-3">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">New Password*</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-white">Confirm Password*</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {message && <p className="text-green-500 mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
}
