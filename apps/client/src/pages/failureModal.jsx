import React from 'react';
import Modal from 'react-modal';

const FailureModal = ({ isOpen, onRequestClose, message }) => {
    const customStyles = {
        content: {
          width: '300px', // Set the desired width
          hight:'auto',
          margin: 'auto',
          backgroundColor: '#FFCDD2',
        },
      };
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false} style={customStyles}>
    <h2 style={{ color: 'white' }}>menambahkan data gagal</h2>
    <p style={{ color: 'white' }}>{message}</p>
    <button onClick={onRequestClose}>Close</button>
  </Modal>
  );
};

export default FailureModal;