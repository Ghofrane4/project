import React, { useState } from "react";
import { useStores } from "stores/StoreProvider"; // Import your store provider
import axios from "axios";
import AddServiceForm from "./AddServiceForm";
import ModalComponent from "components/modal/Modal";
import DeleteModal from "components/modal/DeleteModal";
import Modal from "components/modal/Modal";

const ServiceCard = ({ service }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { serviceStore } = useStores(); // Access MobX store
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fallback image in case the service image is not available
  const defaultImage = "https://via.placeholder.com/150"; // Default image URL

  // Assuming the image path is relative to the backend server
  const imageUrl = service.Icon
    ? `${process.env.REACT_APP_BACKEND_URL}${service?.Icon}`
    : defaultImage;

  // Inline styles
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    width: "100%",
    maxWidth: "300px",
    margin: "auto",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  };

  const detailsStyle = {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };

  const titleStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "8px",
  };

  const descriptionStyle = {
    fontSize: "0.875rem",
    color: "#555",
    marginBottom: "16px",
  };

  const footerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const priceStyle = {
    fontSize: "1.125rem",
    fontWeight: "700",
  };

  const buttonDeleteStyle = {
    backgroundColor: "#f53939",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "8px 16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonDeleteHoverStyle = {
    backgroundColor: "#ea0606",
  };

  const buttonStyle = {
    backgroundColor: "#82d616",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "8px 16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#65a30d",
  };

  // State to manage button hover effect
  const [isHovered, setIsHovered] = React.useState(false);
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const deleteCard = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/service/delete/${service?.id}`
      );
      if (response.status === 200) {
        serviceStore.removeService(service?.id);
        setIsDeleteModalOpen(false);
      }
    } catch (err) {
      console.error("Error while saving Service data:", err);
    }
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={imageUrl} // Use the correct image URL
        alt={service.Title}
        style={imageStyle}
      />
      <div style={detailsStyle}>
        <h2 style={titleStyle}>{service.Title}</h2>
        <p style={descriptionStyle}>{service.Description}</p>
        <div style={footerStyle}>
          <button
            style={{
              ...buttonDeleteStyle,
              ...(isHovered ? buttonDeleteHoverStyle : {}),
            }}
            onClick={handleDeleteModal}
          >
            Supprimer
          </button>
          <button
            style={{
              ...buttonStyle,
              ...(isHovered ? buttonHoverStyle : {}),
            }}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Modifier
          </button>
        </div>
      </div>

      <ModalComponent isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <AddServiceForm onClose={() => setModalOpen(false)} service={service} />
      </ModalComponent>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title={'Supprimer "Service"'}
      >
        {" "}
        <DeleteModal
          bodyModal="Êtes-vous sûr de vouloir supprimer ce service ?"
          onClose={handleCloseDeleteModal}
          handleDelete={deleteCard}
        />
      </Modal>
    </div>
  );
};

export default ServiceCard;
