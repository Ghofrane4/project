import React from 'react';
import PropTypes from 'prop-types';

const ImageModal = ({ src, alt, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={onClose}>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
      />
      <button
        className="absolute top-4 right-4 text-white text-2xl bg-black p-2 rounded-full"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
};

ImageModal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
