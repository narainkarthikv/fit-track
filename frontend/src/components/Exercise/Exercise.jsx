import { FaCheckCircle, FaTimesCircle, FaTrash } from "react-icons/fa";
import { Button, Table } from "react-bootstrap";

const Exercise = ({ deleteExercise, exercise }) => {
    return (
        <tr>
            <td>{exercise.description}</td>
            <td>{exercise.duration} mins</td>
            <td>
                {exercise.exerciseCheck ? (
                    <FaCheckCircle className="text-success" />
                ) : (
                    <FaTimesCircle className="text-danger" />
                )}
            </td>
            <td>
                <Button variant="outline-danger" size="md" className="rounded-pill" onClick={() => deleteExercise(exercise._id)}>
                    <FaTrash className="d-flex align-items-center" />
                </Button>
            </td>
        </tr>
    );
}

export default Exercise;
