import React from 'react';
import heroImg from '../../assets/images/f1.png';

const Hero = () => (
  <section className="hero bg-dark text-white py-5" style={{ minHeight: '100vh' }}>
    <div className="container">
      <div className="row align-items-center flex-column-reverse flex-md-row">
        {/* Left: Text */}
        <div className="col-md-6 text-center text-md-start">
          <h1 className="fw-bold display-1 mb-4" style={{ letterSpacing: '1px' }}>
            Track Your <span style={{ color: '#FFC107' }}>Fitness</span> <br />Own Your <span style={{ color: '#FFC107' }}>Progress</span>
          </h1>
          <p className="lead mb-4" style={{ fontSize: '1.25rem' }}>
            Crush your workouts, build habits, and visualize your gains with Fit-Track.
          </p>
          <a
            href="/login"
              className="btn btn-lg px-4 py-2 fw-semibold gradient-btn"
            >
            Get Started
            </a>
            <style>{`
            .gradient-btn {
                background: linear-gradient(135deg, orange, transparent);
                border: none;
                color: white;
                 transition: all 0.3s ease-in-out;
             }
            .gradient-btn:hover {
                background: linear-gradient(135deg, orange,  orange);
            transform: scale(1.05);
            }
            `}</style>
          </div>

        {/* Right: Image */}
        <div className="col-md-6 text-center mb-md-0">
          <img
            src={heroImg}
            alt="Fit-Track Preview"
            className="img-fluid hero-img animate__animated animate__fadeInRight"
          />
        </div>
      </div>
    </div>

    {/* Inline CSS block */}
    <style>{`
  .hero-img {
    width: 100%;
    max-width: 100%;
    height: auto;
    transition: all 0.3s ease-in-out;
  }

  @media (min-width: 992px) {
    .hero-img {
      width: 120%; /* Increase width on laptop */
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

export default Hero;
