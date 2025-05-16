import React from "react";
import { observer } from "mobx-react-lite";
import axios from "axios";
import { useStores } from "stores/StoreProvider"; // Import your store provider
import { toast } from "react-toastify";

const AddContactInformation = observer(({ onClose, isUpdate }) => {
    const { contactInformationStore } = useStores(); // Access MobX store

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("id");
        if (!userId) {
            console.error("User ID not found. Please log in again.");
            return;
        }

        const requestBody = {
            NameText: contactInformationStore.NameText,
            EmailText: contactInformationStore.EmailText,
            SubjectText: contactInformationStore.SubjectText,
            MessageText: contactInformationStore.MessageText,
            ButtonText: contactInformationStore.ButtonText,
            userId: userId,
        };

        try {
            if (isUpdate) {
                const response = await axios.put(
                    `${process.env.REACT_APP_BACKEND_URL}/contactInformation/update/${userId}`,
                    requestBody
                );
                if (response.status === 200) {
                    contactInformationStore.updateContactInformation(response.data);
                    contactInformationStore.updateExist(true)
                    toast.success("Les informations de contact ont été mises à jour avec succès..",{progress: undefined,hideProgressBar:true,position:"bottom-right"}); 


                }
            } else {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/contactInformation/add`,
                    requestBody
                );
                if (response.status === 201) {
                    contactInformationStore.updateContactInformation(response.data);
                    contactInformationStore.updateExist(true)
                    toast.success("Les informations de contact ont été ajoutées avec succès..",{progress: undefined,hideProgressBar:true,position:"bottom-right"}); 

                   
                }
            }
            onClose(); // Close the modal on successful save or update
        } catch (err) {
            console.error(`Error while ${isUpdate ? "updating" : "saving"} contactInformation:`, err);
            toast.error("Une erreur est survenue lors de l'enregistrement des données.",{progress: undefined,hideProgressBar:true,position:"bottom-right"}); 

        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4 flex space-x-4">
                <div className="flex-1">
                    <label htmlFor="accueilTitle" className="mb-2 block text-base font-semibold leading-6 text-gray-900">
                        Texte du nom
                    </label>
                    <input
                        type="text"
                        id="NameText"
                        value={contactInformationStore.NameText}
                        onChange={(e) => contactInformationStore.updateNameText(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    /></div>
                <div className="flex-1">
                    <label htmlFor="productTitle" className="mb-2 block text-base font-semibold leading-6 text-gray-900">
                        Texte d'Email
                    </label>
                    <input
                        type="text"
                        id="EmailText"
                        value={contactInformationStore.EmailText}
                        onChange={(e) => contactInformationStore.updateEmailText(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                </div>
            </div>

            <div className="mb-4 flex space-x-4">
                <div className="flex-1">

                    <label htmlFor="accueilDescription" className="mb-2 block text-base font-semibold leading-6 text-gray-900">
                        Texte du sujet
                    </label>
                    <input
                        type="text"
                        id="SubjectText"
                        value={contactInformationStore.SubjectText}
                        onChange={(e) => contactInformationStore.updateSubjectText(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                </div>


                <div className="flex-1">
                    <label htmlFor="productDescription" className="mb-2 block text-base font-semibold leading-6 text-gray-900">
                        Texte de message
                    </label>
                    <input
                        type="text"
                        id="MessageText"
                        value={contactInformationStore.MessageText}
                        onChange={(e) => contactInformationStore.updateMessageText(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                </div>
            </div>
            {/* Product Title, Description, and Service Title */}
            <div className="mb-4 flex space-x-4">

                <div className="flex-1">
                    <label htmlFor="serviceTitle" className="mb-2 block text-base font-semibold leading-6 text-gray-900">
                        Texte du bouton
                    </label>
                    <input
                        type="text"
                        id="ButtonText"
                        value={contactInformationStore.ButtonText}
                        onChange={(e) => contactInformationStore.updateButtonText(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                </div>

            </div>

            {/* Buttons */}
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

export default AddContactInformation;
