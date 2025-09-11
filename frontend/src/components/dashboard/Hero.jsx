import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/images/f1.png';

const Hero = ({ isLoggedIn }) => (
  <section className="hero bg-dark text-white py-5" style={{ minHeight: '100vh' }}>
    <div className="container">
      <div className="row align-items-center flex-column-reverse flex-md-row">
        {/* Left: Text */}
        <div className="col-md-6 text-center text-md-start animate__animated animate__fadeInLeft">
          <h1 className="fw-bold display-1 mb-4" style={{ letterSpacing: '1px' }}>
            Track Your <span className="text-warning">Fitness</span> <br />
            Own Your <span className="text-warning">Progress</span>
          </h1>
          <p className="lead mb-4" style={{ fontSize: '1.25rem' }}>
            Crush your workouts, build habits, and visualize your gains with Fit-Track.
          </p>
          <Link
            to={isLoggedIn ? "/dashboard" : "/login"}
            className="btn btn-lg px-4 py-2 fw-semibold gradient-btn"
          >
            {isLoggedIn ? 'Go to Dashboard' : 'Get Started'}
          </Link>
        </div>

        {/* Right: Image */}
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src={heroImg}
            alt="Fit-Track Preview"
            className="img-fluid hero-img animate__animated animate__fadeInRight"
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <style>{`
      .hero {
        position: relative;
        overflow: hidden;
      }
      .gradient-btn {
        background: linear-gradient(135deg, #ffa500, #ff8c00);
        border: none;
        color: white;
        transition: all 0.3s ease-in-out;
        box-shadow: 0 4px 15px rgba(255, 165, 0, 0.3);
      }
      .gradient-btn:hover {
        background: linear-gradient(135deg, #ff8c00, #ffa500);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 165, 0, 0.4);
      }
      .hero-img {
        width: 100%;
        max-width: 100%;
        height: auto;
        transition: all 0.3s ease-in-out;
        filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.1));
      }
      @media (min-width: 992px) {
        .hero-img {
          width: 120%;
        }
      }
      @media (min-width: 1400px) {
        .hero-img {
          width: 170%;
        }
      }
    `}</style>
  </section>
);

Hero.propTypes = {
  isLoggedIn: PropTypes.bool
};

Hero.defaultProps = {
  isLoggedIn: false
};

export default Hero;
