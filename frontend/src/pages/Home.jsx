import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExercisesList from '../components/ExercisesList';
import Quotes from '../components/Quotes';
import UserRoutine from '../components/UserRoutine';
import UserExperience from '../components/UserExperience';
import TotalDays from '../components/TotalDays';
import HeatMap from '../components/HeatMap';

const Home = ({ user }) => {
  const [userDetails, setUserDetails] = useState({ username: '', xp: 0, totalDays: 0 });
  const [quote, setQuote] = useState('');
  const backendURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/user/${user}`);
        setUserDetails(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching the user", err);
      }
    };

    const fetchQuote = async () => {
      try {
        const response = await axios.get('https://api.api-ninjas.com/v1/quotes?category=inspirational', {
          headers: {
            'X-Api-Key': import.meta.env.VITE_APININJAS
          }
        });
        setQuote(response.data[0].quote);
      } catch (err) {
        console.error("Error fetching Quotes", err);
      }
    };

    fetchUserDetails();
    fetchQuote();
  }, [user, backendURL]);

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-sm-3 col-md-3 col-lg-3 mb-3">
          <div className="border rounded-5 p-3 bg-dark text-white">
            <UserExperience userID={user} userDetails={userDetails} />
          </div>
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6 mb-3">
          <div className="border rounded-5 p-3 bg-dark text-white">
            <Quotes userID={user} quote={quote} />
          </div>
        </div>
        <div className="col-sm-3 col-md-3 col-lg-3 mb-3">
          <div className="border rounded-5 p-3 bg-dark text-white">
            <TotalDays userDetails={userDetails} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="border rounded-5 p-3 bg-dark text-white">
            <ExercisesList userID={user} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="row mb-3">
            <div className="col-12 mb-3">
              <div className="border rounded-5 p-3 bg-dark text-white">
                <UserRoutine userID={user} setUserDetails={setUserDetails} />
              </div>
            </div>
            <div className="col-12">
              <div className="border rounded-5 p-3 bg-dark text-white">
                <HeatMap userID={user} setUserDetails={setUserDetails} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
