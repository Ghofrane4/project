import React, { useState, useEffect } from "react";
import Card from "components/card";
import { observer } from "mobx-react-lite";
import { useStores } from "stores/StoreProvider";
import axios from "axios";
import Modal from "components/modal/Modal";
import AddAboutUsForm from "./AddAboutUsForm";
import banner from "assets/img/profile/banner.png";
import AboutUsCard from "components/card/AboutUsCard";
import {
  MdOutlineModeEditOutline,
  MdDeleteOutline,
  MdAdd,
} from "react-icons/md";
import NoDataComponent from "components/dataComponent/NoDataComponent";
import DeleteModal from "components/modal/DeleteModal";

const AboutUs = observer(() => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen   ] = useState(false);

  const { aboutUsStore } = useStores();
  const {
    Title,
    Description,
    BannerTitle,
    BannerDescription,
    BannerImage,
    Exist,
  } = aboutUsStore;
  const userId = localStorage.getItem("id");

  const fetchData = async () => {
    if (!userId) {
      console.error("User ID not found. Please log in again.");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/aboutus/display/${userId}`
      );
      if (response.status === 200) {
        aboutUsStore.updateExist(true);
        aboutUsStore.updateAboutUs(response.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [aboutUsStore]);

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
        `${process.env.REACT_APP_BACKEND_URL}/aboutus/delete/${userId}`
      );
      if (response.status === 200) {
        aboutUsStore.resetAboutUs();
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
          {Title}
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
     {Exist ?
      (<>
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center space-y-4 rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-navy-700">
          <p className="text-sm text-gray-600">Titre "Qui sommes-nous"</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {Title}
          </p>
          <p className="text-sm text-gray-600">Description "Qui sommes-nous"</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {Description}
          </p>
          <p className="text-sm text-gray-600">Titre de la bannière</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {BannerTitle}
          </p>
          <p className="text-sm text-gray-600">Description de la bannière</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {BannerDescription}
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center space-y-4 rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <div className="w-[70%]">
            <AboutUsCard
              BannerTitle={BannerTitle}
              BannerDescription={BannerDescription}
              image={
                 BannerImage ? `${process.env.REACT_APP_BACKEND_URL}` + BannerImage : banner
              }
            />
          </div>
        </div>
      </div>
      </>)
      : <NoDataComponent/>
      }

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}   title={Exist ? 'Mise à jour "Qui sommes-nous"' : 'Nouveau "Qui sommes-nous"'}
      >
        <AddAboutUsForm onClose={handleCloseModal} isUpdate={Exist} />
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
});

export default AboutUs;
