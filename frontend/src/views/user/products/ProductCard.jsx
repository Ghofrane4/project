import React, { useState } from "react";
import { useStores } from "stores/StoreProvider"; // Import your store provider
import axios from "axios";
import Modal from "components/modal/Modal";
import AddProductForm from "./AddProductForm";
import ModalComponent from "components/modal/Modal";
import DeleteModal from "components/modal/DeleteModal";

const ProductCard = ({ product }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const { productStore } = useStores(); // Access MobX store

  // Fallback image in case the service image is not available
  const defaultImage = "https://via.placeholder.com/150"; // Default image URL

  // Assuming the image path is relative to the backend server
  const imageUrl = product?.image
    ? `${process.env.REACT_APP_BACKEND_URL}${product?.image}`
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
    height: "200px",
    objectFit: "contain",
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
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  // State to manage button hover effect
  const [isHovered, setIsHovered] = React.useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/products/delete/${product?.id}`
      );
      if (response.status === 200) {
        productStore.removeProduct(product?.id);
        setIsDeleteModalOpen(false);
      }
    } catch (err) {
      console.error("Error while saving product data:", err);
    }
  };

  return (
    <>
      <div
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={imageUrl} alt={product?.title} style={imageStyle} />
        <div style={detailsStyle}>
          <h2 style={titleStyle}>{product?.title}</h2>
          <p style={descriptionStyle}>{product?.description}</p>
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

        <ModalComponent
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        >
          <AddProductForm
            onClose={() => setModalOpen(false)}
            product={product}
          />
        </ModalComponent>
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title={"Supprimer Produit"}
      >
        {" "}
        <DeleteModal
          bodyModal="Êtes-vous sûr de vouloir supprimer ce produit ?"
          onClose={handleCloseDeleteModal}
          handleDelete={handleDelete}
        />
      </Modal>
    </>
  );
};

export default ProductCard;
