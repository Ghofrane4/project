import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    fullname: '',
    email: '',
    role: '',
    companyName: '', 
    companyFunctionality: '', 
    phoneNumber: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/admin/${id}`);
        setAdminData(response.data);
      } catch (err) {
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [id]);

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/update/${id}`, adminData);
      navigate('/admin/nft-marketplace');
    } catch (err) {
      setError('Failed to update user.');
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this admin?');
    if (confirmed) {
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/users/delete/${id}`);
        navigate('/admin/nft-marketplace');
      } catch (err) {
        setError('Failed to delete user.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-lg">
        <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold mb-6 text-center">Edit Admin</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="fullname">
              Full Name
            </label>
            <input
              name="fullname"
              type="text"
              value={adminData.fullname}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={adminData.email}
              disabled
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="role">
              Role
            </label>
            <select
              name="role"
              value={adminData.role}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="admin">Admin</option>
              <option value="visitor">Visitor</option>
            </select>
          </div>
          {/* New fields for companyName, companyFunctionality, and phoneNumber */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="companyName">
              Company Name
            </label>
            <input
              name="companyName"
              type="text"
              value={adminData.companyName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="companyFunctionality">
              Company Functionality
            </label>
            <input
              name="companyFunctionality"
              type="text"
              value={adminData.companyFunctionality}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              type="text"
              value={adminData.phoneNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
            <button
              className="bg-red-600 hover:bg-red-800 text-white font-semibold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
              onClick={handleDelete}
              type="button"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdmin;
