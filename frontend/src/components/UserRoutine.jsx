import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateTotalDays } from "../slices/userRoutineSlice";

const UserRoutine = ({ userID }) => {
    const dispatch = useDispatch();

    // Retrieve dayCheck and totalDays from Redux store
    const { dayCheck = [] } = useSelector((state) => state.userRoutine); // Default to empty array if undefined

    // Weekdays array
    const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    // Function to handle button clicks for marking days
    const onButtonClick = (index) => {
        const updatedDayCheck = [...dayCheck];
        updatedDayCheck[index] = !updatedDayCheck[index]; // Toggle day status

        // Dispatch action to update dayCheck and totalDays in Redux
        dispatch(updateTotalDays(userID, updatedDayCheck));
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h5 className="font-weight-bold">User Weekly Routine</h5>
            <div className="btn-group" role="group" aria-label="Day Buttons">
                {dayCheck.length > 0 && dayCheck.map((day, index) => (
                    <div key={index} className="d-flex flex-column align-items-center m-1">
                        <button
                            onClick={() => onButtonClick(index)}
                            className={`btn rounded-pill d-flex ${day ? "btn-outline-success" : "btn-outline-danger"}`}
                        >
                            {day ? <FaCheckCircle /> : <FaTimesCircle />}
                        </button>
                        <small className="mt-1 font-weight-bold">{weekdays[index]}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserRoutine;
