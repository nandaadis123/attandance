import React from 'react';
import Modal from 'react-modal';

const SuccessModal = ({ isOpen, onRequestClose, message }) => {
  const customStyles = {
    content: {
      width: '300px', // Set the desired width
      height:'300px',
      margin: 'auto',
      backgroundColor: '#BBDEFB',
    },
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false} style={customStyles}>
      <h2 style={{ color: 'white' }}>Registration Successful</h2>
      <p style={{ color: 'white' }}>{message}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default SuccessModal;
