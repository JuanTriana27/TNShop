// src/components/Modal/Modal.jsx
import React from 'react';
import '../../assets/css/modal.css';

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;