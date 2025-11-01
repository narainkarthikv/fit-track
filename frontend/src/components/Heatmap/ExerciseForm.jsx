import React from 'react';
import { Form } from 'react-bootstrap';
import { FaCalendarAlt, FaDumbbell } from 'react-icons/fa';

const ExerciseForm = ({
  exerciseDate,
  setExerciseDate,
  newExerciseCount,
  setNewExerciseCount,
}) => {
  return (
    <Form className="py-3">
      <Form.Group controlId="exerciseDate" className="mb-4">
        <Form.Label className="d-flex align-items-center gap-2 text-muted mb-2">
          <FaCalendarAlt />
          <span>Exercise Date</span>
        </Form.Label>
        <Form.Control
          type="date"
          value={exerciseDate}
          onChange={(e) => setExerciseDate(e.target.value)}
          className="form-control-lg border-0 bg-light"
        />
      </Form.Group>
      <Form.Group controlId="exerciseCount">
        <Form.Label className="d-flex align-items-center gap-2 text-muted mb-2">
          <FaDumbbell />
          <span>Number of Exercises</span>
        </Form.Label>
        <Form.Control
          type="number"
          min="0"
          value={newExerciseCount}
          onChange={(e) => setNewExerciseCount(Number(e.target.value) || 0)}
          className="form-control-lg border-0 bg-light"
          placeholder="Enter exercise count"
        />
      </Form.Group>
    </Form>
  );
};

export default ExerciseForm;
