import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const { setAuthData } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        {
          emailOrPhone: formData.emailOrPhone,
          password: formData.password,
        }
      );

      const { token, user } = response.data;

      // Set authentication data
      setAuthData(token, user);

      setFormData({
        emailOrPhone: '',
        password: '',
      });

      setMessage('Login successful!');
      setIsError(false);

      setTimeout(() => {
        navigate('/home'); // Redirect to Home after successful login
      }, 2000);

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setMessage(errorMessage);
      setIsError(true);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          boxShadow: 3,
          padding: 4,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h4" component="h2" sx={{ marginBottom: 2 }}>
          Login
        </Typography>

        {message && (
          <Alert severity={isError ? 'error' : 'success'} sx={{ marginBottom: 2 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="emailOrPhone"
            label="Email or Phone"
            variant="outlined"
            value={formData.emailOrPhone}
            onChange={handleChange}
            required
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            name="password"
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            value={formData.password}
            required
            sx={{ marginBottom: 2 }}
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
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
           <Link>forgot password?</Link>
           </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginBottom: 2 }} // Add spacing below the button
          >
            Login
          </Button>
        </form>

        <Typography variant="body2" sx={{ marginTop: 1 }}>
          Don't have an account? <Link to="/signup">Signup</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
