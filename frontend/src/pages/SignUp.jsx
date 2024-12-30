import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRunning, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import ProgressBar from 'react-bootstrap/ProgressBar';
import InputField from '../components/common/InputField';

// Main SignUp Component
const SignUp = () => {
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Let’s Get Started!');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));

    // Calculate progress based on the number of fields filled
    const filledFields = Object.values({ ...formState, [name]: value }).filter((field) => field !== '').length;
    const newProgress = (filledFields / 4) * 100;
    setProgress(newProgress);
    updateMessage(newProgress);
  };

  const updateMessage = (progress) => {
    if (progress === 0) setMessage("Let's Get Started!");
    else if (progress <= 25) setMessage('Warming Up!');
    else if (progress <= 50) setMessage('Hitting Your Stride!');
    else if (progress <= 75) setMessage('Almost There!');
    else setMessage('Final Stretch!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const { confirmPassword, ...formData } = formState;

    try {
      const response = await axios.post(`${backendURL}/api/user/add`, formData);
      navigate('/login');
      console.log("User added successfully: ", response);
    } catch (error) {
      setError('Failed to sign up');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#d3d3d3' }}>
      <form
        className="p-5 bg-light rounded shadow-lg text-center"
        style={{ width: '100%', maxWidth: '400px', borderRadius: '12px' }}
        onSubmit={handleSubmit}
      >
        <HeaderSection />
        <ProgressBar now={progress} className="mb-3" animated style={{ height: '10px', borderRadius: '5px' }} />
        <div className="text-muted mb-3">{message}</div>

        {/* Input Fields using InputField Component */}
        {['username', 'email', 'password', 'confirmPassword'].map((field, index) => (
          <InputField
            key={index}
            id={field}
            name={field}
            type={field.includes('password') ? 'password' : 'text'}
            placeholder={capitalizeFirstLetter(field)}
            value={formState[field]}
            onChange={handleChange}
            Icon={getIcon(field)}
          />
        ))}

        {error && <div className="text-danger mb-3">{error}</div>}

        <button className="btn btn-danger btn-block mb-4" type="submit">
          Start Your Journey
        </button>

        <div className="text-muted small">
          Already have an account?{' '}
          <Link to="/login" className="text-primary" aria-label="Login">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

const HeaderSection = () => (
  <div className="mb-4">
    <FaRunning size={50} color="#ff6f61" aria-hidden="true" />
    <h1 className="mt-2" style={{ color: '#ff6f61' }}>Join Fit-Track</h1>
    <p className="text-muted">Your fitness journey starts here!</p>
  </div>
);

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const getIcon = (field) => {
  switch (field) {
    case 'username':
      return FaUser;
    case 'email':
      return FaEnvelope;
    case 'password':
    case 'confirmPassword':
      return FaLock;
    default:
      return null;
  }
};

export default SignUp;
