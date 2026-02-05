import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import Card from './components/common/Card';
import UserExperience from './components/UserExperience';
import Quotes from './components/Quotes';
import TotalDays from './components/TotalDays';
import HeatMap from './components/HeatMap';
import ExerciseTable from './components/Exercise/ExerciseTable';
import ExerciseForm from './components/Exercise/ExerciseForm';
import CalendarSelector from './components/Heatmap/HeatmapControls';

const Home = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Top Section: User XP, Quote, Year Progress */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <UserExperience />
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Quotes />
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <TotalDays />
            <HeatMap />
          </Card>
        </Grid>
      </Grid>

      {/* Middle Section: Streak Tracker & Calendar Selector */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <TotalDays />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CalendarSelector />
          </Card>
        </Grid>
      </Grid>

      {/* Bottom Section: Exercise Table */}
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { md: 'center' },
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, mb: { xs: 2, md: 0 } }}>
                Exercises
              </Typography>
              <ExerciseForm />
            </Box>
            <Box sx={{ overflowX: 'auto' }}>
              <ExerciseTable />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
