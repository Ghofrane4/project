import React from "react";
import { observer } from "mobx-react-lite";
import axios from "axios";
import { useStores } from "stores/StoreProvider"; // Import your store provider
import { toast } from "react-toastify";

const AddContentSectionForm = observer(({ onClose, isUpdate }) => {
  const { contentSectionStore } = useStores(); // Access MobX store

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");
    if (!userId) {
      console.error("User ID not found. Please log in again.");
      return;
    }

    const requestBody = {
      AccueilTitle: contentSectionStore.AccueilTitle,
      AccueilDescription: contentSectionStore.AccueilDescription,
      ProductTitle: contentSectionStore.ProductTitle,
      ProductDescription: contentSectionStore.ProductDescription,
      ServiceTitle: contentSectionStore.ServiceTitle,
      ServiceDescription: contentSectionStore.ServiceDescription,
      ContactTitle: contentSectionStore.ContactTitle,
      ContactDescription: contentSectionStore.ContactDescription,
      userId: userId,
    };

    try {
      if (isUpdate) {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/sectionContent/update/${userId}`,
          requestBody
        );
        if (response.status === 200) {
          contentSectionStore.updateContentSection(response.data);
          contentSectionStore.updateExist(true)
          toast.success("Les informations de contact ont été mises à jour avec succès..",{progress: undefined,hideProgressBar:true,position:"bottom-right"}); 


        }
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/sectionContent/add`,
          requestBody
        );
        if (response.status === 201) {
          contentSectionStore.updateContentSection(response.data);
          contentSectionStore.updateExist(true)
          toast.success("Les informations de contact ont été enregistrées avec succès..",{progress: undefined,hideProgressBar:true,position:"bottom-right"}); 

        }
      }
      onClose(); // Close the modal on successful save or update
    } catch (err) {
      console.error(`Error while ${isUpdate ? "updating" : "saving"} content:`, err);
      toast.error(err,{progress: undefined,hideProgressBar:true,position:"bottom-right"}); 

    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Accueil Title and Description */}
      <div className="mb-4 flex space-x-4">
      <div className="flex-1">
        <label htmlFor="accueilTitle" className="mb-2 block text-base font-semibold leading-6 text-gray-900">
          Titre d'acceuil
        </label>
        <input
          type="text"
          id="accueilTitle"
          value={contentSectionStore.AccueilTitle}
          onChange={(e) => contentSectionStore.updateAccueilTitle(e.target.value)}
          className="bg-gray-50 caret-transparent border border-inherit text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        /></div>
        <div className="flex-1">
          <label htmlFor="productTitle" className="mb-2 block text-base font-semibold leading-6 text-gray-900">
            Titre de produit
          </label>
          <input
            type="text"
            id="productTitle"
            value={contentSectionStore.ProductTitle}
            onChange={(e) => contentSectionStore.updateProductTitle(e.target.value)}
            className="bg-gray-50 caret-transparent  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
      </div>

      <div className="mb-4 flex space-x-4">
      <div className="flex-1">

        <label htmlFor="accueilDescription" className="mb-2 block text-base font-semibold leading-6 text-gray-900">
          Description d'acceuil
        </label>
        <textarea
          id="accueilDescription"
          value={contentSectionStore.AccueilDescription}
          onChange={(e) => contentSectionStore.updateAccueilDescription(e.target.value)}
          className="bg-gray-50 caret-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>

     
      <div className="flex-1">
      <label htmlFor="productDescription" className="mb-2 block text-base font-semibold leading-6 text-gray-900">
            Description de produit
          </label>
          <textarea
            id="productDescription"
            value={contentSectionStore.ProductDescription}
            onChange={(e) => contentSectionStore.updateProductDescription(e.target.value)}
            className="bg-gray-50 caret-transparent  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        </div>
      {/* Product Title, Description, and Service Title */}
      <div className="mb-4 flex space-x-4">

        <div className="flex-1">
          <label htmlFor="serviceTitle" className="mb-2 block text-base font-semibold leading-6 text-gray-900">
            Titre de service
          </label>
          <input
            type="text"
            id="serviceTitle"
            value={contentSectionStore.ServiceTitle}
            onChange={(e) => contentSectionStore.updateServiceTitle(e.target.value)}
            className=" bg-gray-50 caret-transparent  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="contactTitle" className="mb-2 block text-base font-semibold leading-6 text-gray-900">
            Titre de contact
          </label>
          <input
            type="text"
            id="contactTitle"
            value={contentSectionStore.ContactTitle}
            onChange={(e) => contentSectionStore.updateContactTitle(e.target.value)}
            className="bg-gray-50 caret-transparent  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
      </div>

      {/* Service Description, Contact Title, and Contact Description */}
      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label htmlFor="serviceDescription" className="mb-2 block text-base font-semibold leading-6 text-gray-900">
            Description de service
          </label>
          <textarea
            id="serviceDescription"
            value={contentSectionStore.ServiceDescription}
            onChange={(e) => contentSectionStore.updateServiceDescription(e.target.value)}
            className="bg-gray-50 caret-transparent  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>



        <div className="flex-1">
          <label htmlFor="contactDescription" className="mb-2 block text-base font-semibold leading-6 text-gray-900">
            Description de contact
          </label>
          <textarea
            id="contactDescription"
            value={contentSectionStore.ContactDescription}
            onChange={(e) => contentSectionStore.updateContactDescription(e.target.value)}
            className="bg-gray-50 caret-transparent  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="caret-transparent  sm:flex sm:flex-row-reverse justify-start">
        <button type="submit" className="inline-flex w-full justify-center rounded-md bg-brand-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:caret-transparent 0 sm:ml-3 sm:w-auto">
          {isUpdate ? "Modifier" : "Enregistrer"}
        </button>
        <button type="button" onClick={onClose} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:caret-transparent  sm:mt-0 sm:w-auto">
          Annuler
        </button>
      </div>
    </form>
  );
});

export default AddContentSectionForm;
