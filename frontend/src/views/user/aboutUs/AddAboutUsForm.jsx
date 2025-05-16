import React from "react";
import { observer } from "mobx-react-lite";
import axios from "axios";
import { useStores } from "stores/StoreProvider"; // Import your store provider
import { toast } from "react-toastify";

const AddAboutUsForm = observer(({ onClose,isUpdate  }) => {
  const { aboutUsStore } = useStores(); // Access MobX store
  const { Title, Description, BannerTitle, BannerDescription, BannerImage } =
    aboutUsStore;
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const userId = localStorage.getItem("id");
      if (!userId) {
        console.error("User ID not found. Please log in again.");
        return;
      }
  
      const formData = new FormData();
      formData.append("Title", Title);
      formData.append("Description", Description);
      formData.append("BannerTitle", BannerTitle);
      formData.append("BannerDescription", BannerDescription);
      formData.append("image", BannerImage);
      formData.append("userId", userId);
  
      try {
        if (isUpdate) {
          const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/aboutus/update/${userId}`,
            formData
          );
          if (response.status === 200) {
            aboutUsStore.updateAboutUs(response.data);
            aboutUsStore.updateExist(true)
            toast.success('Les informations de la section "Qui sommes-nous" ont été mises à jour avec succès.',{progress: undefined,hideProgressBar:true,position:"bottom-right"}); 
          }
        } else {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/aboutus/add`,
            formData
          );
          if (response.status === 201) {
            aboutUsStore.updateAboutUs(response.data);
            aboutUsStore.updateExist(true)
            toast.success('Les informations "Qui sommes-nous" ont été enregistrées avec succès.'
              ,{progress: undefined,hideProgressBar:true,position:"bottom-right"}
            );          }
        }
        onClose(); // Close the modal on successful save or update
      } catch (err) {
        console.error(`Error while ${isUpdate ? "updating" : "saving"} About Us data:`, err);
        toast.error("Une erreur est survenue lors de l'enregistrement des données.",{progress: undefined,hideProgressBar:true,position:"bottom-right"}); 

      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="mb-2 block text-base font-semibold leading-6 text-gray-900">
          Titre
        </label>
        <input
          type="text"
          id="title"
          value={aboutUsStore.Title}
          onChange={(e) => aboutUsStore.updateTitle(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="mb-2 block text-base font-semibold leading-6 text-gray-900"
        >
          Description
        </label>
        <textarea
          id="description"
          value={aboutUsStore.Description}
          onChange={(e) => aboutUsStore.updateDescription(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="bannerTitle"
          className="mb-2 block text-base font-semibold leading-6 text-gray-900"
        >
          Titre de la bannière
        </label>
        <input
          type="text"
          id="bannerTitle"
          value={aboutUsStore.BannerTitle}
          onChange={(e) => aboutUsStore.updateBannerTitle(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="bannerDescription"
          className="mb-2 block text-base font-semibold leading-6 text-gray-900"
        >
          Description de la bannière
        </label>
        <textarea
          id="bannerDescription"
          value={aboutUsStore.BannerDescription}
          onChange={(e) => aboutUsStore.updateBannerDescription(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>
      <div className="mb-4">
        <div>
          <label className="mb-2 block text-base font-semibold leading-6 text-gray-900">
            Importer  l'image
          </label>
          <input
            type="file"
            
            onChange={(e) => aboutUsStore.updateBannerImage(e.target.files[0])} // Set the image file
            className="text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required={!isUpdate}
          />
        </div>
      </div>
      {/* <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="mr-2 rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-700"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          {isUpdate ? "Update" : "Save"}
        </button>
      </div> */}
        <div className="bg-gray-50 sm:flex sm:flex-row-reverse justify-start">
        <button type="submit" className="inline-flex w-full justify-center rounded-md bg-brand-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto">
          {isUpdate ? "Modifier" : "Enregistrer"}
        </button>
        <button type="button" onClick={onClose} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
          Annuler
        </button>
      </div>
    </form>
  );
});

export default AddAboutUsForm;
