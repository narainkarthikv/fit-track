import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRunning, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Form, Button, Container, Card, ProgressBar } from 'react-bootstrap';
import InputField from '../components/common/InputField';
import HeaderSection from '../components/common/HeaderSection';
import SubmitButton from '../components/common/SubmitButton';
import SignupLink from '../components/common/SignupLink';
import Lottie from 'react-lottie';
import animationData from '../assets/lottie/signup-lottie.json';
import Snackbar from '../components/common/Snackbar';

const SignUp = () => {
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Let’s Get Started!');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));

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

    if (formState.password !== formState.confirmpassword) {
      setError('Passwords do not match');
      return;
    }

    const { confirmpassword, ...formData } = formState;

    try {
      const response = await axios.post(`${backendURL}/api/user/add`, formData);
      setSnackbar({ show: true, message: 'Sign up successful!', type: 'success' });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      console.log("User added successfully: ", response);
    } catch (error) {
      setError('Failed to sign up');
      setSnackbar({ show: true, message: 'Sign up failed!', type: 'failure' });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <Container fluid className="d-flex align-items-center justify-content-center vh-100 p-0">
        <div className="d-flex w-100 h-100">
          <div className="d-none d-md-flex align-items-center justify-content-center flex-grow-1" style={{ backgroundColor: '#ffffff', cursor: 'default' }}>
            <Lottie options={defaultOptions} height={500} width={500} />
          </div>
          <div className="d-flex align-items-center justify-content-center flex-grow-1">
            <Card className="p-5 bg-white rounded shadow-lg" style={{ width: '100%', maxWidth: '450px', border: '1px solid #ccc', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <Form onSubmit={handleSubmit} style={{ borderRadius: '12px' }}>
                <HeaderSection title="Join Fit-Track" icon={<FaRunning size={50} color="#ff6f61" />} />
                <ProgressBar now={progress} className="mb-3" animated style={{ height: '10px', borderRadius: '5px', backgroundColor: '#ff6f61' }} />
                <div className="text-muted mb-3 text-center">{message}</div>

                {['username', 'email', 'password', 'confirm password'].map((field, index) => (
                  <InputField
                    key={index}
                    id={field}
                    name={field}
                    type={field.includes('password') && !showPassword ? 'password' : 'text'}
                    placeholder={capitalizeFirstLetter(field)}
                    value={formState[field]}
                    onChange={handleChange}
                    Icon={getIcon(field)}
                    appendIcon={field.includes('password') ? (showPassword ? FaEyeSlash : FaEye) : null}
                    onAppendIconClick={field === 'password' ? togglePasswordVisibility : field === 'confirmpassword' ? toggleConfirmPasswordVisibility : null}
                    className="mb-3"
                  />
                ))}

                {error && <div className="text-danger mb-3">{error}</div>}

                <div className="d-flex justify-content-center">
                  <SubmitButton text="Start Your Journey" className="w-100 mb-3" />
                </div>

                <SignupLink text="Already have an account?" linkText="Log in" linkTo="/login" className="text-center" />
              </Form>
            </Card>
          </div>
        </div>
      </Container>
      <Snackbar
        show={snackbar.show}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ show: false, message: '', type: '' })}
      />
    </>
  );
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const getIcon = (field) => {
  switch (field) {
    case 'username':
      return FaUser;
    case 'email':
      return FaEnvelope;
    case 'password':
    case 'confirm password':
      return FaLock;
    default:
      return null;
  }
};

export default SignUp;
