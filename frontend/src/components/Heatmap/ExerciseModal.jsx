import React from "react";
import { Modal, Button } from "react-bootstrap";
import ExerciseForm from "./ExerciseForm";

const ExerciseModal = ({
    showAddModal,
    handleClose,
    handleSubmitExercise,
    exerciseDate,
    setExerciseDate,
    newExerciseCount,
    setNewExerciseCount
}) => {
    return (
        <Modal show={showAddModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ExerciseForm
                    exerciseDate={exerciseDate}
                    setExerciseDate={setExerciseDate}
                    newExerciseCount={newExerciseCount}
                    setNewExerciseCount={setNewExerciseCount}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSubmitExercise}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ExerciseModal;
