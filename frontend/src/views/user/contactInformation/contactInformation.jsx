import React, { useState, useEffect } from "react";
import Card from "components/card";
import axios from "axios";
import { useStores } from "stores/StoreProvider";
import { observer } from "mobx-react-lite";
import {
  MdOutlineModeEditOutline,
  MdDeleteOutline,
  MdAdd,
} from "react-icons/md";
import Modal from "components/modal/Modal";
import DeleteModal from "components/modal/DeleteModal";
import AddContactInformation from "./addContactInformation";
import NoDataComponent from "components/dataComponent/NoDataComponent";

const ContentSection = () => {
  const { contactInformationStore } = useStores();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const userId = localStorage.getItem("id");

  const fetchData = async () => {
    if (!userId) {
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/contactInformation/display/${userId}`
      );
      if (response.status === 200) {
        contactInformationStore.updateExist(true);
        contactInformationStore.updateContactInformation(response.data);
      }
    } catch (err) {
      console.error("Error:", err); // Log error details
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactInformationStore]);

  const { NameText, EmailText, SubjectText, MessageText, ButtonText, Exist } =
    contactInformationStore;

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleAddClick = () => {
    setModalOpen(true);
  };
  const buttonT = Exist ? (
    <div className="flex items-center">
      <MdOutlineModeEditOutline /> <span className="ml-2">Modifier</span>{" "}
    </div>
  ) : (
    <div className="flex items-center">
      <MdAdd />
      <span className="ml-2">Ajouter</span>{" "}
    </div>
  );
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/contactInformation/delete/${userId}`
      );
      if (response.status === 200) {
        contactInformationStore.resetContactInformation();
        contactInformationStore.updateExist(false);
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Error deleting contactInformation:", error);
    }
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <Card extra={"w-full h-full p-3 mt-10 "}>
      <div className="mt-2 mb-8 flex w-full flex-row justify-end ">
        {/* <p className="mt-2 px-2 text-base text-gray-600">
          Manage your Contact Information here. You can customize your profile,
          adjust preferences, and more.
        </p> */}
        <div className="space-x-3">
          <button
            onClick={handleAddClick}
            className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-600 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
          >
            {" "}
            {buttonT}
          </button>
          {Exist && (
            <button
              onClick={handleDeleteModal}
              className="rounded-[20px] bg-lightPrimary px-4 py-2 text-[#F95454] hover:bg-red-100"
            >
              <div className="flex items-center">
                <MdDeleteOutline color="#F95454" />
                <span className="ml-2">Supprimer</span>{" "}
                {/* Added a span for better control over spacing */}
              </div>
            </button>
          )}
        </div>
      </div>
      {Exist ? (
        <div className="grid grid-cols-2 gap-4 px-2">
          <div className="flex flex-col items-start justify-center space-y-4 rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">nom</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {NameText}
            </p>
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {EmailText}
            </p>
            <p className="text-sm text-gray-600">sujet</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {SubjectText}
            </p>
          </div>

          <div className="flex flex-col items-start justify-start space-y-4 rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">message</p>

            <p className="text-base font-medium text-navy-700 dark:text-white">
              {MessageText}
            </p>

            <p className="text-sm text-gray-600">bouton</p>

            <p className="text-base font-medium text-navy-700 dark:text-white">
              {ButtonText}
            </p>
          </div>
        </div>
      ) : (
        <NoDataComponent />
      )}
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={Exist ? "Mettre à jour les coordonnées" : "Nouvelles coordonnées"}
      >
        {" "}
        <AddContactInformation onClose={handleCloseModal} isUpdate={Exist} />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title={"Delete Contact Information"}
      >
        {" "}
        <DeleteModal
          onClose={handleCloseDeleteModal}
          handleDelete={handleDelete}
        />
      </Modal>
    </Card>
  );
};

export default observer(ContentSection);
