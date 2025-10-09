import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CTA = ({ isLoggedIn }) => {
  return (
    <section className="cta position-relative text-white text-center py-5">
      <div className="cta-overlay"></div>
      <div className="container position-relative">
        <h2 className="display-4 fw-bold mb-3 text-shadow">
          Ready to Transform Your Body?
        </h2>
        <p className="lead mb-4 fs-5 text-shadow">
          Join thousands of fitness enthusiasts who trust
          <strong>Fit-Track</strong>
          to monitor their workouts, track progress, and achieve their goals
          every day.
        </p>
        <Link
          to={isLoggedIn ? 'dashboard' : 'signup'}
          className="btn btn-warning btn-lg px-5 py-3 rounded-pill fw-semibold cta-btn"
        >
          {isLoggedIn ? 'Go to Dashboard' : 'Sign Up Now'}
        </Link>
      </div>
    </section>
  );
};

CTA.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default CTA;
