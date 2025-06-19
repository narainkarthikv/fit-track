import React from 'react';
import PropTypes from 'prop-types';
import { FaUserCircle, FaRunning, FaCalendarPlus, FaFire, FaChartLine } from 'react-icons/fa';

const Features = () => {
  return (
    <section className="features-section py-5" id="features">
      <div className="container">
        <h2 className="mb-5 display-5 fw-bold text-center">
          Why Choose <span className="text-warning">Fit-Track?</span>
        </h2>
        <div className="row g-4 justify-content-center">
          {features.map((feature, idx) => (
            <div className="col-12 col-sm-6 col-lg-4 d-flex" key={idx}>
              <div className="feature-glass-card p-4 rounded-4 shadow-lg w-100 d-flex flex-column align-items-center h-100">
                <div className={`icon-box mb-3 text-${feature.color}`} aria-label={feature.title} tabIndex={0}>
                  {feature.icon}
                </div>
                <h5 className="fw-semibold mb-2 text-center">{feature.title}</h5>
                <p className="text-muted text-center mb-0">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .features-section {
          background: linear-gradient(120deg, #f8fafc 60%, #e3e6ed 100%);
        }
        .feature-glass-card {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(200,200,200,0.18);
          box-shadow: 0 8px 32px 0 rgba(31,38,135,0.10);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .feature-glass-card:hover, .feature-glass-card:focus-within {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 16px 40px 0 rgba(31,38,135,0.18);
        }
        .icon-box {
          font-size: 3rem;
          background: linear-gradient(135deg, #fffbe6 60%, #ffe082 100%);
          border-radius: 50%;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 12px rgba(255,193,7,0.10);
        }
        @media (max-width: 768px) {
          .feature-glass-card {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

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

Features.propTypes = {};

export default Features;
