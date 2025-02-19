import React from "react";
import { Form } from "react-bootstrap";

const ExerciseForm = ({ exerciseDate, setExerciseDate, newExerciseCount, setNewExerciseCount }) => {
    return (
        <Form>
            <Form.Group controlId="exerciseDate">
                <Form.Label>Select Date:</Form.Label>
                <Form.Control
                    type="date"
                    value={exerciseDate}
                    onChange={(e) => setExerciseDate(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="exerciseCount">
                <Form.Label>Exercise Count:</Form.Label>
                <Form.Control
                    type="number"
                    value={newExerciseCount}
                    onChange={(e) => setNewExerciseCount(Number(e.target.value) || 0)}
                />
            </Form.Group>
        </Form>
    );
};

export default ExerciseForm;
