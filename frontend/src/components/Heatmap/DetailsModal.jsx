import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DetailsModal = ({ showModal, handleClose, selectedValue }) => {
    const defaultValue = {
        date: 'No date selected',
        count: 0,
        dayCheck: false,
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className=text-center>
                    <p>Date: {selectedValue ? selectedValue.date : defaultValue.date}</p>
                    <p>Exercises Count: {selectedValue ? selectedValue.count : defaultValue.count}</p>
                    <p>Day Check: {selectedValue ? (selectedValue.dayCheck ? 'Completed' : 'Not Completed') : (defaultValue.dayCheck ? 'Completed' : 'Not Completed')}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant=secondary onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailsModal;
