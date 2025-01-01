const UserExperience = ({ userDetails }) => {
    return (
        <div className='d-flex flex-column text-center font-weight-bold'>
            <h5>Welcome {userDetails.username}</h5>
            <h6>XP : {userDetails.xp}</h6>
            <div className=progress>
                <div className=progress-bar progress-bar-striped 
                role=progressbar 
                style={{ width: `${(userDetails.xp / 100) * 100}%` }} 
                aria-valuenow={userDetails.xp} 
                aria-valuemin=0 
                aria-valuemax=100>
            </div>
            </div>
        </div>
    );
}

export default UserExperience;
