import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Register() {
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState(''); // New state for company name
  const [companyFunctionality, setCompanyFunctionality] = useState(''); // New state for company functionality
  const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!fullname.trim() || !password.trim() || !confirmPassword.trim() || !companyName.trim() || !companyFunctionality.trim() || !phoneNumber.trim()) {
      setError('Full name, company name, company functionality, phone number, password, and confirmation are required');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/register`, { 
        token, 
        fullname, 
        password, 
        companyName, 
        companyFunctionality, 
        phoneNumber 
      });

      if (response.status === 200) {
        navigate('/auth/sign-in');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Register
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Set up your account by entering your details and a new password!
        </p>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        <form onSubmit={handleRegister}>
          {/* Full Name */}
          <div className="mb-3">
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 dark:text-white">
              Full Name*
            </label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter your full name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Company Name */}
          <div className="mb-3">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-white">
              Company Name*
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter your company name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Company Functionality */}
          <div className="mb-3">
            <label htmlFor="companyFunctionality" className="block text-sm font-medium text-gray-700 dark:text-white">
              Company Functionality*
            </label>
            <input
              type="text"
              id="companyFunctionality"
              value={companyFunctionality}
              onChange={(e) => setCompanyFunctionality(e.target.value)}
              placeholder="Enter the functionality of your company"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-white">
              Phone Number*
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">
              Password*
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-white">
              Confirm Password*
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
