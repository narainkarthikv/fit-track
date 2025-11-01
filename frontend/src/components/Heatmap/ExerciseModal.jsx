import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';
import ExerciseForm from './ExerciseForm';

const ExerciseModal = ({
  showAddModal,
  handleClose,
  handleSubmitExercise,
  exerciseDate,
  setExerciseDate,
  newExerciseCount,
  setNewExerciseCount,
}) => {
  return (
    <Modal show={showAddModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="text-primary fw-bold">Add Exercise</Modal.Title>
        <Button 
          variant="link" 
          className="p-0 ms-auto text-muted" 
          onClick={handleClose}
          aria-label="Close"
        >
          <FaTimes />
        </Button>
      </Modal.Header>
      <Modal.Body className="pt-2">
        <ExerciseForm
          exerciseDate={exerciseDate}
          setExerciseDate={setExerciseDate}
          newExerciseCount={newExerciseCount}
          setNewExerciseCount={setNewExerciseCount}
        />
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button 
          variant="outline-secondary" 
          className="rounded-pill px-4"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button 
          variant="primary" 
          className="rounded-pill px-4 d-flex align-items-center gap-2"
          onClick={handleSubmitExercise}
        >
          <FaSave />
          Save Exercise
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExerciseModal;
