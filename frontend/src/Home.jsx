import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import UserExperience from './components/UserExperience';
import Quotes from './components/Quotes';
import TotalDays from './components/TotalDays';
import HeatMap from './components/HeatMap';
import ExerciseTable from './components/Exercise/ExerciseTable';
import ExerciseForm from './components/Exercise/ExerciseForm';
import CalendarSelector from './components/Heatmap/HeatmapControls';

// Responsive homepage layout using Tailwind and Bootstrap
const Home = () => {
  return (
    <Container fluid className="px-2 md:px-8 py-4 transition-all duration-300">
      {/* Top Section: User XP, Quote, Year Progress */}
      <Row className="gap-4 mb-4 flex flex-col lg:flex-row">
        {/* User XP Card */}
        <Col xs={12} lg={4} className="mb-4 lg:mb-0">
          <Card className="shadow-lg rounded-xl h-full transition-all duration-300 hover:scale-[1.02]">
            <Card.Body className="p-4">
              {/* User XP Progress and Welcome */}
              <UserExperience />
            </Card.Body>
          </Card>
        </Col>
        {/* Quote of the Day Card */}
        <Col xs={12} md={6} lg={4} className="mb-4 lg:mb-0">
          <Card className="shadow-lg rounded-xl h-full transition-all duration-300 hover:scale-[1.02]">
            <Card.Body className="p-4 flex flex-col justify-center items-center">
              <Quotes />
            </Card.Body>
          </Card>
        </Col>
        {/* Year Workout Progress Card */}
        <Col xs={12} md={6} lg={4}>
          <Card className="shadow-lg rounded-xl h-full transition-all duration-300 hover:scale-[1.02]">
            <Card.Body className="p-4">
              <TotalDays />
              <HeatMap />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Middle Section: Streak Tracker & Calendar Selector */}
      <Row className="gap-4 mb-4 flex flex-col md:flex-row">
        {/* Day Streak Tracker */}
        <Col xs={12} md={6} className="mb-4 md:mb-0">
          <Card className="shadow-lg rounded-xl h-full transition-all duration-300 hover:scale-[1.02]">
            <Card.Body className="p-4">
              {/* Streak tracker component */}
              <TotalDays />
            </Card.Body>
          </Card>
        </Col>
        {/* Monthly Calendar Selector */}
        <Col xs={12} md={6}>
          <Card className="shadow-lg rounded-xl h-full transition-all duration-300 hover:scale-[1.02]">
            <Card.Body className="p-4">
              {/* Calendar selector component */}
              <CalendarSelector />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bottom Section: Exercise Table */}
      <Row>
        <Col xs={12}>
          <Card className="shadow-lg rounded-xl transition-all duration-300 hover:scale-[1.01]">
            <Card.Body className="p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-0">
                  Exercises
                </h2>
                {/* Add Exercise Button */}
                <ExerciseForm />
              </div>
              {/* Exercise Table: horizontally scrollable on mobile */}
              <div className="overflow-x-auto transition-all duration-300">
                <ExerciseTable />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
