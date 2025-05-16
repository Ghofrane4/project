import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageModal from './components/ImageModal'; // Adjust the path as necessary

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/display/${id}`);
        if (response.data) {
          setProduct(response.data);
        } else {
          setError('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/products/delete/${id}`);
      navigate('/admin/data-tables'); // Redirect after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product. Please try again later.');
    }
  };

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage('');
    document.body.style.overflow = 'auto'; // Restore scrolling when modal is closed
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="relative">
      {modalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" style={{ backdropFilter: 'blur(4px)' }}></div>}
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          {product.image && (
            <div
              onClick={() => openModal(`${process.env.REACT_APP_BACKEND_URL}${product.image}`)}
              className="cursor-pointer"
            >
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`}
                alt={product.title}
                className="w-full h-60 object-cover mb-4"
              />
            </div>
          )}
          <p className="text-lg mb-4"><strong>Description:</strong> {product.description}</p>
          <p className="text-lg mb-4"><strong>Technical Description:</strong> {product.technicalDescription}</p>
          <p className="text-lg mb-4"><strong>Category:</strong> {product.productCategory}</p>
          <p className="text-lg mb-4"><strong>Price:</strong> ${product.price}</p>
          <p className="text-lg mb-4"><strong>Status:</strong> {product.productStatus}</p>
          <p className="text-lg mb-4"><strong>Stock:</strong> {product.stock}</p>
          <button
            onClick={() => navigate(`/product/products/update/${product.id}`)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 mr-4"
          >
            Update Product
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete Product
          </button>
        </div>
      </div>
      {modalOpen && (
        <ImageModal
          src={modalImage}
          alt={product.title}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ProductDetails;
