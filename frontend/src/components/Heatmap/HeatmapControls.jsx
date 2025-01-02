import React from "react";
import { Button } from "react-bootstrap";

const HeatmapControls = ({ selectedMonth, setSelectedMonth, handleAddExercise, months }) => {
    return (
        <div className="d-flex justify-content-between m-3">
            <div className="d-flex">
                <label className="mr-2 mt-2" htmlFor="selectMonth">Select Month:</label>
                <select
                    id="selectMonth"
                    className="form-control w-auto form-select rounded-1"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    {months.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <Button variant="btn btn-outline-primary" onClick={handleAddExercise}>Add Exercise</Button>
            </div>
        </div>
    );
};

export default HeatmapControls;
