import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Quotes = ({ userID, quote }) => {
    return (
        <div className='d-flex flex-column align-items-center'>
            <h5>Quote of the Day</h5>
            <p className="text-center text text-info text-capitalize ">"{quote}"</p>       
        </div>
    );
};

export default Quotes;
