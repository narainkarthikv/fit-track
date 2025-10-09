import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/images/f1.png';

const Hero = ({ isLoggedIn }) => {
  return (
    <section
      className="hero bg-dark text-white py-5"
      style={{ minHeight: '100vh' }}
    >
      <div className="container">
        <div className="row align-items-center flex-column-reverse flex-md-row">
          {/* Left: Text */}
          <div className="col-md-6 text-center text-md-start animate__animated animate__fadeInLeft">
            <h1
              className="fw-bold display-1 mb-4"
              style={{ letterSpacing: '1px' }}
            >
              Track Your <span className="text-warning">Fitness</span> <br />
              Own Your <span className="text-warning">Progress</span>
            </h1>
            <p className="lead mb-4" style={{ fontSize: '1.25rem' }}>
              Crush your workouts, build habits, and visualize your gains with
              Fit-Track.
            </p>
            <Link
              to={isLoggedIn ? '/dashboard' : '/login'}
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
    </section>
  );
};
Hero.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default Hero;
