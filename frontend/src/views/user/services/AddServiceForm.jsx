import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import axios from "axios";
import { useStores } from "stores/StoreProvider"; // Import your store provider
import Select from 'react-select';

const AddServiceForm = observer(({ onClose, service }) => {
  const { serviceStore } = useStores(); // Access MobX store
  const [Description, setDescriptione] = useState(service?.Description);
  const [Title, setTitle] = useState(service?.Title);
  // const [icon, setIcon] = useState(service?.icon);
  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultIcon = "/icons/placeholder/circle-forbidden.svg"; 
  // const defaultSelected = icons.find(icon => icon.value === defaultIcon);


  const [selectedIcon, setSelectedIcon] = useState({
    value: service?.Icon || defaultIcon,
    label: service?.Icon.split('/').pop().replace('.svg', '') || 'select icon'
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getListIcons`)
      .then((response) => response.json())
      .then((data) => {
        const iconOptions = data.icons.map((iconUrl) => ({
          value: iconUrl,
          label: iconUrl.split('/').pop().replace('.svg', '') // Extract filename as label
        }));
        setIcons(iconOptions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching icons:", error);
        setLoading(false);
      });
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedIcon(selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");
    if (!userId) {
      console.error("User ID not found. Please log in again.");
      return;
    }
    // Send a POST request to the backend
    try {
      const data = {
        Title,
        Description,
        Icon: selectedIcon?.value,
        userId,
      };

      console.log(data);

      if (service) {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/service/update/${service.id}`,
          data
        );
        if (response.status === 200) {
          console.log("Service data saved successfully.", response.data);
          serviceStore.editService(service.id, response.data);
          onClose(); // Close the modal on successful save
        }
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/service/add`,
          data
        );
        if (response.status === 201) {
          console.log("Service data saved successfully.", response.data);
          serviceStore.addService(response.data);
          onClose(); // Close the modal on successful save
        }
      }
    } catch (err) {
      console.error("Error while saving Service data:", err);
    }
  };

  const IconOption = ({ data }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={`${process.env.REACT_APP_BACKEND_URL}${data?.value}`}
        alt={data.label}
        style={{ width: '30px', height: '30px', marginRight: '10px' }}
      />
      <span>{data.label}</span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="mb-2 block font-bold text-gray-900">
          Titre
        </label>
        <input
          type="text"
          id="title"
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-50 w-full rounded border py-2 px-3 shadow"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="mb-2 block font-bold text-gray-900"
        >
          Description
        </label>
        <textarea
          id="description"
          value={Description}
          onChange={(e) => setDescriptione(e.target.value)}
          className="bg-gray-50 w-full rounded border py-2 px-3 shadow"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="mb-2 block font-bold text-gray-900"
        >
          Sélectionner l'icône
        </label>
        <Select
        options={icons}
        value={selectedIcon}
        isLoading={loading}
        onChange={handleChange}
        getOptionLabel={option => <IconOption data={option} />}
        getOptionValue={option => option?.value}
        placeholder="Select an icon"
      />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="mr-2 rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-700"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
});

export default AddServiceForm;
