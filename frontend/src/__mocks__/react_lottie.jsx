// frontend/src/__mocks__/react-lottie.js
import PropTypes from 'prop-types';

const Lottie = (props) => {
  return <div data-testid="lottie-mock">{props.animationData ? 'Lottie Animation' : null}</div>;
};

Lottie.propTypes = {
  animationData: PropTypes.any,
};

export default Lottie;
