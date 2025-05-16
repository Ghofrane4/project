import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: '',
    description: '',
    technicalDescription: '',
    productCategory: '',
    price: '',
    stock: '',
    productStatus: 'available',
    image: null, // Changed to handle file uploads
    visibility: true
  });
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/display/${id}`);
        setProduct(response.data);
        setPreviewImage(`${process.env.REACT_APP_BACKEND_URL}${response.data.image}`);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'file' ? files[0] : value
    }));

    if (type === 'file') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {

         // Retrieve user info from local storage
         const userId = localStorage.getItem('id');

         console.log('User ID:', userId);

         if (!userId) {
             setError('User is not authenticated');
             return;
         }


        const formData = new FormData();
        for (const key in product) {
            formData.append(key, product[key]);
        }
        

        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/products/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 200) {
            navigate(`/admin/data-tables`);
        } else {
            setError('Failed to update product. Please try again later.');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        setError('Failed to update product. Please try again later.');
    }
};



  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          {/* Technical Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Technical Description</label>
            <textarea
              name="technicalDescription"
              value={product.technicalDescription}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          {/* Product Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Category</label>
            <input
              type="text"
              name="productCategory"
              value={product.productCategory}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          {/* Product Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Status</label>
            <select
              name="productStatus"
              value={product.productStatus}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          {/* Image File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            {previewImage && <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover mb-4" />}
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          {/* Visibility */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Visibility</label>
            <select
              name="visibility"
              value={product.visibility}
              onChange={(e) => handleChange({ target: { name: 'visibility', value: e.target.value === 'true' } })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value={true}>Visible</option>
              <option value={false}>Hidden</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
