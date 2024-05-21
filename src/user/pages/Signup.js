import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Alert,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthContext } from '../../contexts/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const { setAuthData } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, acceptTerms: e.target.checked });
  };

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setIsError(true);
      return;
    }

    if (!formData.acceptTerms) {
      setMessage('You must accept the terms and policies');
      setIsError(true);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/signup',
        {
          fname: formData.fname,
          lname: formData.lname,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        }
      );

      const { token, user } = response.data;

      // Set authentication data
      setAuthData(token, user);

      // Clear the form after successful registration
      setFormData({
        fname: '',
        lname: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
      });

      setMessage('Registration successful!');
      setIsError(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed';
      setMessage(errorMessage);
      setIsError(true);
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        component="div"
        sx={{
          boxShadow: 3,
          padding: 4,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Register
        </Typography>

        {message && (
          <Alert
            severity={isError ? 'error' : 'success'}
            style={{ marginBottom: 16 }}
          >
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="fname"
            label="First Name"
            variant="outlined"
            value={formData.fname}
            onChange={handleChange}
            required
            style={{ marginBottom: 16 }}
          />
          <TextField
            fullWidth
            name="lname"
            label="Last Name"
            variant="outlined"
            value={formData.lname}
            onChange={handleChange}
            required
            style={{ marginBottom: 16 }}
          />
          <TextField
            fullWidth
            name="phone"
            label="Phone"
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ marginBottom: 16 }}
          />
          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="outlined"
            type="email"
            value={formData.email}
            onChange={handleChange}
            style={{ marginBottom: 16 }}
          />
          <TextField
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            required
            style={{ marginBottom: 16 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.acceptTerms}
                onChange={handleCheckboxChange}
              />
            }
            label="I accept the terms and policies"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Register
          </Button>
        </form>

        <Typography variant="body2" style={{ marginTop: 16 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;
