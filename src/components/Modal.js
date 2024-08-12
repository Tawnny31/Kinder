// Modal.js
import React from 'react';
import './Modal.css'; // Asegúrate de crear este archivo CSS para los estilos del modal

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        {children}
      </div>
    </div>
  );
};

export default Modal;
