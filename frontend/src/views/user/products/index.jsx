import React, { useEffect, useState } from "react";
import Card from "components/card";
import axios from "axios";
import { useStores } from "stores/StoreProvider";
import { observer } from "mobx-react-lite";
import ProductCard from "./ProductCard";
import Modal from "components/modal/Modal";
import AddProductForm from "./AddProductForm";
import { MdAdd } from "react-icons/md";
import NoDataComponent from "components/dataComponent/NoDataComponent";

const Products = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { productStore } = useStores();

  const fetchData = async () => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      return;
    }
    try {
      setLoading(true);
      const idUser = localStorage.getItem("id")
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/list/${idUser}`);
      if (response.status === 200) {        
        productStore.getProducts(response.data);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error:", err); // Log error details
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  

  const handleAddClick = () => {
    setModalOpen(true);
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
          <div className="flex items-center">
            <MdAdd />
            <span className="ml-2">Ajouter</span>{" "}
          </div>
        </button>
        </div>
      </div>

      {loading ? (
        <p>loading ...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productStore?.products?.map((product) =>{
            return(
            <ProductCard key={product.id} product={product} />
            )
          })}
        </div>
      )}
      {productStore?.products?.length === 0 && <NoDataComponent />}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={"Ajouter un nouveau produit"}>
        <AddProductForm onClose={handleCloseModal} />
      </Modal>
    </Card>
  );
};

export default observer(Products);
