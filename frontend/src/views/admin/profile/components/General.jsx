import React, { useState, useEffect } from 'react';
import Card from 'components/card';
import axios from 'axios';
import { useStores } from "stores/StoreProvider";

const General = ({user, loading}) => {
  const { profileStore } = useStores();
  const [fullname, setFullname] = useState(user?.fullname);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [companyName, setCompanyName] = useState(user?.companyName);
  const [companyFunctionality, setCompanyFunctionality] = useState(user?.companyFunctionality);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingCompanyName, setIsEditingCompanyName] = useState(false);
  const [isEditingCompanyFunctionality, setIsEditingCompanyFunctionality] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFullname(user.fullname);
      setPhoneNumber(user.phoneNumber);
      setCompanyName(user.companyName);
      setCompanyFunctionality(user.companyFunctionality);
    }
  }, [user]);

  const handleSave = async () => {
    const userId = localStorage.getItem('id'); // Retrieve user ID from localStorage

    if (!userId) {
        setError('User ID not found. Please log in again.');
        return;
    }

    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/update/${userId}`, {
            email: user?.email,
            fullname,
            companyName,
            companyFunctionality,
            phoneNumber
        });

        if (response.status === 200) {
            setSuccess('Profil mis à jour avec succès !');
            localStorage.setItem('fullname', fullname); // Update localStorage
            setIsEditingName(false)
            setIsEditingCompanyName(false)
            setIsEditingCompanyFunctionality(false)
            setIsEditingPhone(false)
        }
    } catch (err) {
        console.error('Error:', err); // Log error details
        setError('Failed to update profile. Please try again.');
    }
};

  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Informations générales
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">
          Gérez vos paramètres ici. Vous pouvez personnaliser votre profil, ajuster vos préférences, etc.
        </p>
      </div>
{
  loading ? <p> loading ... </p> :

  <>
        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Nom et prénom</p>
          {isEditingName ? (
            <>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={handleSave}
                className="mt-2 rounded-xl bg-brand-500 py-2 px-4 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                Enregistrer
              </button>
            </>
          ) : (
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {fullname}
            </p>
          )}
          <button
            onClick={() => setIsEditingName(!isEditingName)}
            className="mt-2 text-sm font-medium text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {isEditingName ? 'Annuler' : 'Modifier'}
          </button>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Email</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {profileStore?.user?.email}
          </p>
        </div>
      </div>


      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Nom de l'entreprise</p>
          {isEditingCompanyName ? (
            <>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={handleSave}
                className="mt-2 rounded-xl bg-brand-500 py-2 px-4 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                Enregistrer
              </button>
            </>
          ) : (
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {companyName}
            </p>
          )}
          <button
            onClick={() => setIsEditingCompanyName(!isEditingCompanyName)}
            className="mt-2 text-sm font-medium text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {isEditingCompanyName ? 'Annuler' : 'Modifier'}
          </button>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Fonctionnalité de l'entreprise</p>
          {isEditingCompanyFunctionality ? (
            <>
              <input
                type="text"
                value={companyFunctionality}
                onChange={(e) => setCompanyFunctionality(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={handleSave}
                className="mt-2 rounded-xl bg-brand-500 py-2 px-4 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                Enregistrer
              </button>
            </>
          ) : (
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {companyFunctionality}
            </p>
          )}
          <button
            onClick={() => setIsEditingCompanyFunctionality(!isEditingCompanyFunctionality)}
            className="mt-2 text-sm font-medium text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {isEditingCompanyFunctionality ? 'Annuler' : 'Modifier'}
          </button>
        </div>
      </div>


      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Numéro de téléphone</p>
          {isEditingPhone ? (
            <>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={handleSave}
                className="mt-2 rounded-xl bg-brand-500 py-2 px-4 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                Enregistrer
              </button>
            </>
          ) : (
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {phoneNumber}
            </p>
          )}
          <button
            onClick={() => setIsEditingPhone(!isEditingPhone)}
            className="mt-2 text-sm font-medium text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {isEditingPhone ? 'Annuler' : 'Modifier'}
          </button>
        </div>
      </div>
  </>
}
      {/* Display success or error messages */}
      {success && <p className="text-green-500 mt-2">{success}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </Card>
  );
};

export default General;
