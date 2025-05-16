import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  // Fallback image in case the product image is not available
  const defaultImage = 'https://via.placeholder.com/150'; // Default image URL

  // Assuming the image path is relative to the backend server
  const imageUrl = product.image ? `${process.env.REACT_APP_BACKEND_URL}${product.image}` : defaultImage;

  // Inline styles
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    width: '100%',
    maxWidth: '300px',
    margin: 'auto'
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  };

  const detailsStyle = {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '8px'
  };

  const descriptionStyle = {
    fontSize: '0.875rem',
    color: '#555',
    marginBottom: '16px'
  };

  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const priceStyle = {
    fontSize: '1.125rem',
    fontWeight: '700'
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3'
  };

  // State to manage button hover effect
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={imageUrl} // Use the correct image URL
        alt={product.title}
        style={imageStyle}
      />
      <div style={detailsStyle}>
        <h2 style={titleStyle}>{product.title}</h2>
        <p style={descriptionStyle}>{product.description}</p>
        <div style={footerStyle}>
          <span style={priceStyle}>${product.price}</span>
          <button
            style={{
              ...buttonStyle,
              ...(isHovered ? buttonHoverStyle : {})
            }}
            onClick={() => navigate(`/product/products/product/${product.id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
