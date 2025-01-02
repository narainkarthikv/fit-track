import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const ExerciseForm = ({ newExerciseData, handleChange, handleAdd, setFormVisible }) => (
  <tr>
    <td colSpan="4">
      <Form onSubmit={handleAdd} className="d-flex justify-content-between align-items-center">
        <Row className="w-100">
          <Col xs={3}>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newExerciseData.description}
              onChange={handleChange}
            />
          </Col>
          <Col xs={3}>
            <Form.Control
              type="number"
              name="duration"
              placeholder="Duration (minutes)"
              value={newExerciseData.duration}
              onChange={handleChange}
            />
          </Col>
          <Col xs={3} className="form-check">
            <Form.Check
              type="checkbox"
              name="exerciseCheck"
              label="Completed"
              checked={newExerciseData.exerciseCheck}
              onChange={handleChange}
            />
          </Col>
          <Col xs={3} className="d-flex justify-content-end">
            <Button
              variant="outline-secondary"
              className="me-1"
              onClick={() => setFormVisible(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="outline-primary">Add</Button>
          </Col>
        </Row>
      </Form>
    </td>
  </tr>
);

export default ExerciseForm;