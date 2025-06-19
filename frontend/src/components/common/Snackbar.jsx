import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Toast, ToastContainer, ProgressBar } from 'react-bootstrap';
import Lottie from 'react-lottie';
import successAnimation from '../../assets/lottie/success-lottie.json';
import failureAnimation from '../../assets/lottie/failure-lottie.json';

const Snackbar = ({ show, message, type, onClose }) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: type === 'success' ? successAnimation : failureAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (show) {
      setProgress(100);
      const timer = setTimeout(onClose, 3000);
      const interval = setInterval(() => {
        setProgress(prev => prev - 1);
      }, 30);
      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [show, onClose]);

  return (
      <ToastContainer position="top-end" className="m-2 custom-toast-container">
        <Toast show={show} onClose={onClose} bg={type === 'success' ? 'success' : 'danger'} className="custom-toast" autohide delay={3000}>
          <Toast.Body className="d-flex align-items-center justify-content-center custom-toast-body">
            <Lottie options={defaultOptions} height={50} width={50} />
            <span className="text-bold custom-toast-message">{message}</span>
            <div className="ms-auto custom-toast-timer">
              <ProgressBar now={progress} className="custom-toast-progress" style={{ height: '5px', width: '50px' }} />
            </div>
            <button type="button" className="btn-close ms-2 custom-toast-close" aria-label="Close" onClick={onClose}></button>
          </Toast.Body>
        </Toast>
      </ToastContainer>
  );
};

Snackbar.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'failure']).isRequired,
  onClose: PropTypes.func.isRequired
};

export default Snackbar;
