import React, {  useState } from "react";
import { observer } from "mobx-react-lite";
import axios from "axios";
import { useStores } from "stores/StoreProvider"; // Import your store provider

const AddProductForm = observer(({ onClose, product }) => {
  const { productStore } = useStores(); // Access MobX store
  const [title, setTitle] = useState(product?.title ||'');
  const [description, setDescription] = useState(product?.description || '');
  const [technicalDescription, setTechnicalDescription] = useState(product?.technicalDescription || '');
  const [productCategory, setProductCategory] = useState(product?.productCategory || '');
  const [price, setPrice] = useState(product?.price || '');
  const [stock, setStock] = useState(product?.stock || '');
  const [productStatus, setProductStatus] = useState(product?.productStatus || 'available');
  const [image, setImage] = useState(product?.image || null); // Changed to null to handle file uploads
  const [visibility, setVisibility] = useState(product?.visibility);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");
    if (!userId) {
      console.error("User ID not found. Please log in again.");
      return;
    }
    // Send a POST request to the backend
    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("technicalDescription", technicalDescription);
      formData.append("productCategory", productCategory);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("productStatus", productStatus);
      formData.append("image", image); // Append the image file
      formData.append("visibility", visibility);
      formData.append("createdBy", userId); // Append the user ID

      if (product) {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/products/update/${product.id}`,
          formData
        );
        if (response.status === 200) {
          productStore.editProduct(product.id, response.data);
          onClose(); // Close the modal on successful save
        }
      } else {
        // Send the POST request to the backend
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/products/add`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          productStore.addProduct(response.data);
          onClose();
        } else {
          console.log("Impossible d'ajouter le produit. Veuillez réessayer ultérieurement.");
        }
      }
    } catch (err) {
      console.error("Error while saving Service data:", err);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="h-[450px] overflow-auto">
       <div className="mb-4 flex space-x-4">
       <div className="flex-1">
        <label className="mb-2 block font-bold text-gray-900">
          Titre
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-50 rounded border py-2 px-3 shadow"
        />
      </div>
      <div className="flex-1">
        <label className="mb-2 block font-bold text-gray-900">
          Catégorie de produit
        </label>
        <input
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="w-full bg-gray-50 rounded border py-2 px-3 shadow"
        />
      </div>
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block font-bold text-gray-900"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-gray-50 rounded border py-2 px-3 shadow"
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block font-bold text-gray-900">
          Description technique
        </label>
        <textarea
          value={technicalDescription}
          onChange={(e) => setTechnicalDescription(e.target.value)}
          className="w-full bg-gray-50 rounded border py-2 px-3 shadow"
        />
      </div>
     
      <div className="mb-4 flex space-x-4">
      <div className="flex-1">     
           <label className="mb-2 block font-bold text-gray-900">
          Prix
        </label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full bg-gray-50 rounded border py-2 px-3 shadow"
        />
      </div>
      <div className="flex-1">     
        <label className="mb-2 block font-bold text-gray-900">
          Stock
        </label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          className="w-full bg-gray-50 rounded border py-2 px-3 shadow"
        />
      </div>
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block font-bold text-gray-900"
        >
          Statut du produit
        </label>
        <div className="w-full flex justify-around">
          <div className="flex gap-2">
            <input type="radio" name="productStatus" checked={productStatus === 'available'} onChange={()=>{ setProductStatus('available');
            }}/>
            <label>Disponible</label> 
          </div>
          <div className="flex gap-2">
            <input type="radio"  name="productStatus" checked={productStatus === 'unavailable'} onChange={()=>setProductStatus('unavailable')}/>
            <label >Indisponible</label>
          </div>
        </div>

      </div>
      <div className="mb-4">
        <label className="mb-2 block font-bold text-gray-900">
          Importer Image
        </label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full   py-2 px-3 "
        />
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block font-bold text-gray-900"
        >
          Visibilité
        </label>
        <div className="w-full flex justify-around">
        <div className="flex gap-2">
          <input type="radio"  name="visibility" checked={visibility === true}  onChange={()=>setVisibility(true)}/>
          <label >Visible</label> 
        </div>
        <div className="flex gap-2">
          <input type="radio" name="visibility" checked={visibility=== false}  onChange={()=>setVisibility(false)} />
          <label >Caché</label> 
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="mr-2 rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-700"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
});

export default AddProductForm;
