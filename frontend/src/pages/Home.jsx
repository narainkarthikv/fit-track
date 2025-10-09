import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ExercisesList from '../components/ExercisesList';
import Quotes from '../components/Quotes';
import UserRoutine from '../components/UserRoutine';
import UserExperience from '../components/UserExperience';
import TotalDays from '../components/TotalDays';
import HeatMap from '../components/HeatMap';

const Home = ({ user }) => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    xp: 0,
    totalDays: 0,
  });
  const [quote, setQuote] = useState('');
  const backendURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/user/${user}`);
        setUserDetails(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching the user', err);
      }
    };

    fetchUserDetails();
  }, [user, backendURL]);

  useEffect(() => {
    if (!quote) {
      const fetchQuote = async () => {
        try {
          const response = await axios.get(
            'https://api.api-ninjas.com/v1/quotes',
            {
              headers: {
                'X-Api-Key': import.meta.env.VITE_APININJAS,
              },
            }
          );
          setQuote(response.data[0].quote);
        } catch (err) {
          console.error('Error fetching Quotes', err);
        }
      };

      fetchQuote();
    }
  }, [quote]);

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col sm={3} md={3} lg={3} className="mb-3">
          <Card className="bg-dark text-white rounded-5 p-3">
            <UserExperience userID={user} userDetails={userDetails} />
          </Card>
        </Col>
        <Col sm={6} md={6} lg={6} className="mb-3">
          <Card className="bg-dark text-white rounded-5 p-3">
            <Quotes userID={user} quote={quote} />
          </Card>
        </Col>
        <Col sm={3} md={3} lg={3} className="mb-3">
          <Card className="bg-dark text-white rounded-5 p-3">
            <TotalDays userDetails={userDetails} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-3">
          <Card className="bg-dark text-white rounded-5 p-3">
            <ExercisesList userID={user} />
          </Card>
        </Col>
        <Col md={6}>
          <Row className="mb-3">
            <Col className="mb-3">
              <Card className="bg-dark text-white rounded-5 p-3">
                <UserRoutine userID={user} setUserDetails={setUserDetails} />
              </Card>
            </Col>
            <Col>
              <Card className="bg-dark text-white rounded-5 p-3">
                <HeatMap userID={user} setUserDetails={setUserDetails} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
