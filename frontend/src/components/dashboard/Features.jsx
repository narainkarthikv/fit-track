import React from 'react';
import { FaUserCircle, FaRunning, FaCalendarPlus, FaFire, FaChartLine } from 'react-icons/fa';

const Features = () => {
  return (
    <section className="py-5 bg-light text-center" id="features">
      <div className="container">
        <h2 className="mb-5 display-5 fw-bold">Why Choose <span style={{ color: '#FFC107' }}>Fit-Track?</span></h2>
        <div className="row g-4 justify-content-center">
          {features.map((feature, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="feature-card p-4 rounded shadow-m h-100">
                <div className={`icon-box mb-3 text-${feature.color}`}>
                  {feature.icon}
                </div>
                <h5 className="fw-semibold">{feature.title}</h5>
                <p className="text-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline styles for the component */}
      <style>{`
        .feature-card {
          background: white;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.1);
        }

        .icon-box {
          font-size: 3rem;
        }

        @media (max-width: 768px) {
          .feature-card {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

// Feature data array for cleaner JSX
const features = [
  {
    icon: <FaUserCircle />,
    title: "Personalized Profiles",
    description: "Customize your fitness experience with your own user dashboard.",
    color: "primary"
  },
  {
    icon: <FaRunning />,
    title: "Track Daily Workouts",
    description: "Log your daily workouts and track progress consistently.",
    color: "success"
  },
  {
    icon: <FaCalendarPlus />,
    title: "Add New Exercises",
    description: "Quickly add new exercises with custom inputs and goals.",
    color: "warning"
  },
  {
    icon: <FaFire />,
    title: "Maintain Streaks",
    description: "Boost motivation with streak tracking and achievement badges.",
    color: "danger"
  },
  {
    icon: <FaChartLine />,
    title: "Visualize Progress",
    description: "Interactive graphs to show day-wise/month-wise exercise trends.",
    color: "info"
  }
];

export default Features;
