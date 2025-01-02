import React from "react";
import { useSelector } from "react-redux"; 

const TotalDays = ({ userDetails }) => { 
    const totalDays = useSelector((state) => state.userRoutine.totalDays); 

    return (
        <div className="d-flex flex-column text-center font-weight-bold">
            <h5>{userDetails.username}'s Year Workout</h5> {/* Use userDetails passed as props */}
            <h6>Total Days: {totalDays}</h6> 
            <div className="progress">
                <div className="progress-bar bg-warning progress-bar-striped" 
                    role="progressbar" 
                    style={{ width: `${(totalDays / 365) * 100}%` }} 
                    aria-valuenow={totalDays} 
                    aria-valuemin="0" 
                    aria-valuemax="365">
                </div>   
            </div>  
        </div>
    );
}

export default TotalDays;
