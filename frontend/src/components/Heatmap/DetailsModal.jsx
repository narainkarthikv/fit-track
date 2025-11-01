import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import { FaCalendarAlt, FaDumbbell, FaTrophy, FaTimes } from 'react-icons/fa';

const DetailsModal = ({ showModal, handleClose, selectedValue }) => {
  const defaultValue = {
    date: 'No date selected',
    count: 0,
  };

  const getFeedbackInfo = (count) => {
    if (count > 8) return { color: 'success', text: 'Excellent!', icon: '🏆' };
    if (count > 5) return { color: 'info', text: 'Good', icon: '💪' };
    if (count > 0) return { color: 'warning', text: 'Keep Going', icon: '🎯' };
    return { color: 'secondary', text: 'No Exercise', icon: '💤' };
  };

  const feedback = getFeedbackInfo(selectedValue ? selectedValue.count : defaultValue.count);

  return (
    <Modal show={showModal} onHide={handleClose} centered size="sm">
      <Modal.Body className="p-4">
        <button
          className="btn-close position-absolute top-0 end-0 m-3"
          onClick={handleClose}
          aria-label="Close"
        />
        
        <div className="text-center">
          <div className="mb-4">
            <div className="d-flex align-items-center justify-content-center gap-2 text-primary">
              <FaCalendarAlt className="fs-5" />
              <h5 className="mb-0 fw-bold">
                {selectedValue ? selectedValue.date : defaultValue.date}
              </h5>
            </div>
          </div>

          <div className="bg-light rounded-4 p-4 mb-4">
            <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
              <FaDumbbell className="text-primary" />
              <span className="text-muted">Exercise Count</span>
            </div>
            <h2 className="mb-0 fw-bold text-primary">
              {selectedValue ? selectedValue.count : defaultValue.count}
            </h2>
          </div>

          <div className={`bg-${feedback.color} bg-opacity-10 rounded-4 p-4`}>
            <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
              <FaTrophy className={`text-${feedback.color}`} />
              <span className="text-muted">Status</span>
            </div>
            <div className="d-flex flex-column align-items-center">
              <span className="display-4 mb-2">{feedback.icon}</span>
              <h4 className={`fw-bold text-${feedback.color} mb-0`}>
                {feedback.text}
              </h4>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DetailsModal;
