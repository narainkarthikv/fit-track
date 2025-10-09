import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FaCalendarAlt } from 'react-icons/fa'; // Import calendar icon

const DetailsModal = ({ showModal, handleClose, selectedValue }) => {
  const defaultValue = {
    date: 'No date selected',
    count: 0,
  };

  const getFeedbackColor = (count) => {
    if (count > 5) {
      return 'text-success';
    } else {
      return 'text-danger';
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Body>
        <div className="text-center">
          <Row className="d-flex justify-content-start align-items-end">
            <Col
              className="p-2 rounded d-flex align-items-center justify-content-center"
              style={{ maxWidth: '200px' }}
            >
              <FaCalendarAlt className="me-2" />
              <p className="mb-0">
                <strong>Date:</strong>{' '}
                {selectedValue ? selectedValue.date : defaultValue.date}
              </p>
            </Col>
          </Row>
          <Row className="justify-content-around mt-3">
            <Col className="p-3 border rounded text-center">
              <p className="fw-bold mb-2">Exercises Count</p>
              <p
                className={`fs-4 ${getFeedbackColor(selectedValue ? selectedValue.count : defaultValue.count)}`}
              >
                {selectedValue ? selectedValue.count : defaultValue.count}
              </p>
            </Col>
            <Col className="p-3 border rounded text-center">
              <p className="fw-bold mb-2">Feedback</p>
              <p
                className={`fs-4 ${getFeedbackColor(selectedValue ? selectedValue.count : defaultValue.count)}`}
              >
                {selectedValue
                  ? selectedValue.count > 5
                    ? 'Good'
                    : 'Bad'
                  : 'None'}
              </p>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DetailsModal;
