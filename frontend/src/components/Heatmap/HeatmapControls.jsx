import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaCalendarPlus } from 'react-icons/fa';

const HeatmapControls = ({
  selectedMonth,
  setSelectedMonth,
  handleAddExercise,
  months,
}) => {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center w-100 gap-3 bg-white p-3 rounded-3 shadow-sm">
      <div className="d-flex align-items-center gap-3">
        <Form.Group className="mb-0">
          <Form.Label className="text-muted small mb-1" htmlFor="selectMonth">
            Month
          </Form.Label>
          <Form.Select
            id="selectMonth"
            className="form-select-sm border-0 shadow-none fw-bold"
            style={{ minWidth: '150px', backgroundColor: '#f8f9fa' }}
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>
      <Button
        variant="primary"
        className="d-flex align-items-center gap-2 rounded-pill shadow-sm"
        onClick={handleAddExercise}
      >
        <FaCalendarPlus />
        <span className="d-none d-sm-inline">Add Exercise</span>
      </Button>
    </div>
  );
};

export default HeatmapControls;
