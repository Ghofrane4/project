import React, { useState, useEffect } from "react";
import Card from "components/card";
import { observer } from "mobx-react-lite";
import { useStores } from "stores/StoreProvider";
import axios from "axios";
import Modal from "components/modal/Modal";
import AddSettingsForm from "./AddSettingsForm";
import NoDataComponent from "components/dataComponent/NoDataComponent";
import { MdAdd, MdOutlineModeEditOutline } from "react-icons/md";
import DeleteModal from "components/modal/DeleteModal";

const Settings = observer(() => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen   ] = useState(false);

  const { settingsStore } = useStores();
  const {
    PrimaryColor,
    SecondaryColor,
    Logo,
    BackgroundImage,
    AccueilContentPosition,
    FacebookLink,
    InstagramLink,
    LinkedinLink,
    TiktokLink,
    YoutubeLink,
    Exist,
  } = settingsStore;
  const userId = localStorage.getItem("id");

  const fetchData = async () => {
    if (!userId) {
      console.error("User ID not found. Please log in again.");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/settings/display/${userId}`
      );
      if (response.status === 200) {
        console.log("response.data", response.data);
        settingsStore.updateExist(true);
        settingsStore.updateSettings(response.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [settingsStore]);

  const handleAddClick = () => {
    setModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/settings/delete/${userId}`
      );
      if (response.status === 200) {
        settingsStore.resetSettings();
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Error deleting aboutus:", error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const buttonText = Exist ? (
    <div className="flex items-center">
      <MdOutlineModeEditOutline /> <span className="ml-2">Modifier</span>{" "}
    </div>
  ) : (
    <div className="flex items-center">
      <MdAdd />
      <span className="ml-2">Ajouter</span>{" "}
    </div>
  );

  return (
    <Card extra={"w-full h-full p-3 mt-10"}>
      <div className="mx-4 mt-2 mb-8 flex justify-end">
        {/* <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Settings
        </h4> */}
        <div className="flex flex-row gap-4">
          <button
            onClick={handleAddClick}
            className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-600 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
          >
            {buttonText}
          </button>
          {Exist && (
            <button
              onClick={handleDeleteModal}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Supprimer
            </button>
          )}
        </div>
      </div>
      {Exist ? (
        <div className="grid grid-cols-2 gap-4 px-2">
          <div className="flex flex-col items-start justify-start space-y-4 rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-navy-700">
            <p className="text-sm text-gray-600">Couleur primaire</p>
            <div
              className="h-10 w-10 cursor-pointer rounded-full border"
              style={{ backgroundColor: PrimaryColor }}
            />
            <p className="text-sm text-gray-600">Couleur secondaire</p>
            <div
              className="h-10 w-10 cursor-pointer rounded-full border"
              style={{ backgroundColor: SecondaryColor }}
            />
            <p className="text-sm text-gray-600">Logo</p>

          {Logo &&  <img
              className="h-10 w-10 rounded-full"
              src={`${process.env.REACT_APP_BACKEND_URL}` + Logo}
              alt="logo"
            />}  

            <p className="text-sm text-gray-600">Image d'arrière-plan</p>
          {  BackgroundImage && <img
              className="w-full h-20"
              src={`${process.env.REACT_APP_BACKEND_URL}` + BackgroundImage}
              alt="BackgroundImage"
            />}
          </div>
          <div className="flex flex-col items-start justify-center space-y-4 rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-navy-700">
            <p className="text-sm text-gray-600">Position du contenu</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {AccueilContentPosition}
            </p>
            <p className="text-sm text-gray-600">Lien Facebook </p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {FacebookLink}
            </p>
            <p className="text-sm text-gray-600">Lien Instagram </p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {InstagramLink}
            </p>
            <p className="text-sm text-gray-600">Lien Linkedin </p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {LinkedinLink}
            </p>
            <p className="text-sm text-gray-600">Lien Tiktok </p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {TiktokLink}
            </p>
            <p className="text-sm text-gray-600">Lien Youtube </p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {YoutubeLink}
            </p>
          </div>
        </div>
      ) : (
        <NoDataComponent />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={Exist ? 'Mise à jour "Paramètres"' : 'Nouveau "Paramètres"'}
      >
        <AddSettingsForm onClose={handleCloseModal} isUpdate={Exist} />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title={'Supprimer "Paramètres"'}
      >
        {" "}
        <DeleteModal onClose={handleCloseDeleteModal} handleDelete={handleDelete} />
      </Modal>
    </Card>
  );
});

export default Settings;
