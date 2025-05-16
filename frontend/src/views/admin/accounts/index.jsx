import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopCreatorTable from "./components/TableTopCreators";
import axios from 'axios';

const Accounts = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/admins`);
        setAdmins(response.data);
      } catch (err) {
        setError('Failed to fetch admins. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleAddAdmin = () => {
    navigate('/admin/accounts/ajoutadmin');
  };

  const handleActivate = async (id) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/activate/${id}`);
      setAdmins(prevAdmins =>
        prevAdmins.map(admin => 
          admin.id === id ? { ...admin, isActive: 1 } : admin
        )
      );
    } catch (err) {
      setError('Failed to activate user. Please try again later.');
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/deactivate/${id}`);
      setAdmins(prevAdmins =>
        prevAdmins.map(admin => 
          admin.id === id ? { ...admin, isActive: 0 } : admin
        )
      );
    } catch (err) {
      setError('Failed to deactivate user. Please try again later.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/accounts/editadmin/${id}`);
  };

  const tableColumns = [
    { Header: 'Full Name', accessor: 'fullname' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Role', accessor: 'role' }, // Added Role column
    { Header: 'Company Name', accessor: 'companyName' }, 
    { Header: 'Company Functionality', accessor: 'companyFunctionality' },
    { Header: 'Phone Number', accessor: 'phoneNumber' },
    { Header: 'Status', accessor: 'isActive', Cell: ({ value }) => (value ? 'Activated' : 'Deactivated') },
    { 
      Header: 'Actions', 
      accessor: 'actions', 
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleEdit(row.original.id)}
          >
            Edit
          </button>
          {row.original.isActive ? (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDeactivate(row.original.id)}
            >
              Deactivate
            </button>
          ) : (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => handleActivate(row.original.id)}
            >
              Activate
            </button>
          )}
        </div>
      )
    }
  ];
  

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <button
        onClick={handleAddAdmin}
        className="linear mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
      >
        Ajouter fournisseur
      </button>
      <div className="pt-12">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="h-[600px] overflow-y-auto">
            <TopCreatorTable
              extra="mb-5"
              tableData={admins}
              columnsData={tableColumns}
              onActivate={handleActivate}
              onDeactivate={handleDeactivate}
              onEdit={handleEdit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Accounts;
