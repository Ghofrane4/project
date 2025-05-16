import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [technicalDescription, setTechnicalDescription] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [productStatus, setProductStatus] = useState('available');
    const [image, setImage] = useState(null); // Changed to null to handle file uploads
    const [visibility, setVisibility] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

            // Create a new FormData object
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('technicalDescription', technicalDescription);
            formData.append('productCategory', productCategory);
            formData.append('price', price);
            formData.append('stock', stock);
            formData.append('productStatus', productStatus);
            formData.append('image', image); // Append the image file
            formData.append('visibility', visibility);
            formData.append('createdBy', userId); // Append the user ID

            // Send the POST request to the backend
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/products/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                navigate('/admin/data-tables'); // Redirect after successful addition
            } else {
                setError('Failed to add product. Please try again later.');
            }
        } catch (err) {
            console.error('Error adding product:', err);
            setError('Failed to add product. Please try again later.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Ajouter Produit</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                {/* Technical Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Technical Description</label>
                    <textarea
                        value={technicalDescription}
                        onChange={(e) => setTechnicalDescription(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                {/* Product Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Category</label>
                    <input
                        type="text"
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                {/* Stock */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                {/* Product Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Status</label>
                    <select
                        value={productStatus}
                        onChange={(e) => setProductStatus(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>
                </div>
                {/* Image File Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])} // Set the image file
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                {/* Visibility */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Visibility</label>
                    <select
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value === 'true')}
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
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
