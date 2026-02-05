import { useEffect, useState } from 'react';
import { Snackbar as MuiSnackbar, Alert, Box, LinearProgress, Typography } from '@mui/material';
import Lottie from 'react-lottie';
import successAnimation from '../../assets/lottie/success-lottie.json';
import failureAnimation from '../../assets/lottie/failure-lottie.json';
import PropTypes from 'prop-types';

const Snackbar = ({ show, message, type, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (show) {
      setProgress(100);
      const timer = setTimeout(onClose, 3000);
      const interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 1, 0));
      }, 30);
      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [show, onClose]);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: type === 'success' ? successAnimation : failureAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <MuiSnackbar
      open={show}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={type === 'success' ? 'success' : 'error'}
        variant="filled"
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ width: 50, height: 50 }}>
          <Lottie options={defaultOptions} height={50} width={50} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {message}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              mt: 1,
              height: 3,
            }}
          />
        </Box>
      </Alert>
    </MuiSnackbar>
  );
};

Snackbar.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'failure', 'error']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Snackbar;
