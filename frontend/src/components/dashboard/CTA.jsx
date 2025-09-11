import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SucessImg from '../../assets/images/succes.jpg';

const CTA = ({ isLoggedIn }) => (
  <section className="cta position-relative text-white text-center py-5">
    <div className="cta-overlay"></div>
    <div className="container position-relative">
      <h2 className="display-4 fw-bold mb-3 text-shadow">Ready to Transform Your Body?</h2>
      <p className="lead mb-4 fs-5 text-shadow">Join thousands of fitness enthusiasts who trust <strong>Fit-Track</strong> to monitor their workouts, track progress, and achieve their goals every day.</p>
      <Link 
        to={isLoggedIn ? "dashboard" : "signup"} 
        className="btn btn-warning btn-lg px-5 py-3 rounded-pill fw-semibold cta-btn"
      >
        {isLoggedIn ? 'Go to Dashboard' : 'Sign Up Now'}
      </Link>
    </div>

    {/* Inline styles for beauty and responsiveness */}
    <style>{`
      .cta {
        background: linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.6)), url(${SucessImg}) no-repeat center center/cover;
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .cta-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255, 136, 0, 0.6), rgba(255, 99, 71, 0.4));
        z-index: 1;
        opacity: 0.2;
      }

      .cta .container {
        z-index: 2;
      }

      .cta-btn {
        background: linear-gradient(135deg, orange, transparent);
        border: none;
        color: black;
        box-shadow: 0 4px 20px rgba(255, 193, 7, 0.5);
        transition: all 0.3s ease;
      }

      .cta-btn:hover {
        background: linear-gradient(135deg, orange, orange);
        color: white;
        transform: scale(1.05);
        box-shadow: 0 6px 25px rgba(255, 87, 34, 0.6);
      }

      .text-shadow {
        text-shadow: 1px 1px 4px rgba(0,0,0,0.8);
      }

      @media (max-width: 768px) {
        .cta {
          padding: 3rem 1rem;
        }

        .cta h2 {
          font-size: 2rem;
        }

        .cta p {
          font-size: 1rem;
        }

        .cta-btn {
          padding: 0.75rem 2rem;
        }
      }
    `}</style>
  </section>
);

CTA.propTypes = {
  isLoggedIn: PropTypes.bool
};

CTA.defaultProps = {
  isLoggedIn: false
};

export default CTA;
