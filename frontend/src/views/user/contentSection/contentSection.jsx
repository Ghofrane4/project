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
import AddContentSectionForm from "./AddContentSectionForm";
import NoDataComponent from "components/dataComponent/NoDataComponent";
import DeleteModal from "components/modal/DeleteModal";

const ContentSection = () => {
  const { contentSectionStore } = useStores();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen   ] = useState(false);

  const userId = localStorage.getItem("id");

  const fetchData = async () => {
    if (!userId) {
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/sectionContent/display/${userId}`
      );
      if (response.status === 200) {
        contentSectionStore.updateExist(true);
        contentSectionStore.updateContentSection(response.data);
      }
    } catch (err) {
      console.error("Error:", err); // Log error details
    }
  };
  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentSectionStore]);

  const {
    AccueilTitle,
    AccueilDescription,
    ProductTitle,
    ProductDescription,
    ServiceTitle,
    ServiceDescription,
    ContactTitle,
    ContactDescription,
    Exist,
  } = contentSectionStore;

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleAddClick = () => {
    setModalOpen(true);
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
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/sectionContent/delete/${userId}`
      );
      if (response.status === 200) {
        contentSectionStore.resetContentSection();
        contentSectionStore.updateExist(false)
        setIsDeleteModalOpen(false);

      }
    } catch (error) {
      console.error("Error deleting sectionContent:", error);
    }
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <Card extra={"w-full h-full p-3 mt-10 "}>
      <div className="mx-4 mt-2 mb-8 flex justify-end">
      
        <div className="flex flex-row gap-4">
        <button
            onClick={handleAddClick}
            className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-600 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
          >
            {" "}
            {buttonText}
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
      {/* Cards */}

      {Exist?
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center space-y-4 rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Titre d'accueil</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {AccueilTitle}
          </p>
          <p className="text-sm text-gray-600">Description d'accueil</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {AccueilDescription}
          </p>
          <p className="text-sm text-gray-600"> Titre de produit</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {ProductTitle}
          </p>
          <p className="text-sm text-gray-600"> Description de produit</p>

          <p className="text-base font-medium text-navy-700 dark:text-white">
            {ProductDescription}
          </p>
        </div>
        <div className="flex flex-col justify-center space-y-4 rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Titre de service</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {ServiceTitle}
          </p>
          <p className="text-sm text-gray-600">Description de Service </p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {ServiceDescription}
          </p>
          <p className="text-sm text-gray-600">Titre de Contact</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {ContactTitle}
          </p>
          <p className="text-sm text-gray-600">Description de Contact</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {ContactDescription}
          </p>
        </div>
      </div>
      :<NoDataComponent/>}
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={Exist ? "Mise à jour contenu de section" : "Nouvelle contenu de section"}
      >
        {" "}
        <AddContentSectionForm onClose={handleCloseModal} isUpdate={Exist} />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title={"Supprimer la contenu de section"}
      >
        {" "}
        <DeleteModal onClose={handleCloseDeleteModal} handleDelete={handleDelete} />
      </Modal>
    </Card>
  );
};

export default observer(ContentSection);
