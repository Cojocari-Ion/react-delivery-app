import React from 'react';
import { Modal } from 'react-bootstrap';

const TestModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>

        <div className="content">
            
        </div>

    </Modal>
  )
}

export default TestModal