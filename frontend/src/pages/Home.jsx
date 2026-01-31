import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Box } from '@mui/material';
import Card from '../components/common/Card';
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
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backendURL}/api/user/${user}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    <Box 
      component="main" 
      sx={{ 
        flexGrow: 1, 
        p: { xs: 2, sm: 3, md: 4 },
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="xl">
        {/* Top Row - Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <UserExperience userID={user} userDetails={userDetails} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <Quotes userID={user} quote={quote} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <TotalDays userDetails={userDetails} />
            </Card>
          </Grid>
        </Grid>

        {/* Main Content Row */}
        <Grid container spacing={3}>
          {/* Left Column - Exercises List */}
          <Grid item xs={12} lg={6}>
            <Card>
              <ExercisesList userID={user} />
            </Card>
          </Grid>

          {/* Right Column - Routine & Heatmap */}
          <Grid item xs={12} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <UserRoutine userID={user} setUserDetails={setUserDetails} />
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <HeatMap userID={user} setUserDetails={setUserDetails} />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
