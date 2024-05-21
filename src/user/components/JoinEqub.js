import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Alert, Box } from '@mui/material';

const JoinEqub = () => {
  const { id } = useParams(); // Get equb ID from the route
  const [equb, setEqub] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEqubDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        if (!token) {
          throw new Error('Authorization token is missing');
        }

        const response = await axios.get(
          `http://localhost:5000/api/equbs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Set authorization header
            },
          }
        );

        setEqub(response.data.equb);
      } catch (error) {
        setMessage('Error fetching equb details');
        setIsError(true);
      }
    };

    fetchEqubDetails(); // Fetch equb details
  }, [id]);

  const confirmJoinEqub = async () => {
    try {
      const token = localStorage.getItem('token'); // Ensure token is valid
      if (!token) {
        throw new Error('Authorization token is missing');
      }

      const response = await axios.post(
        'http://localhost:5000/api/equbs/join', // Endpoint for joining equb
        { equbId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set authorization header
          },
        }
      );

      setMessage(response.data.message); // Display success message
      setIsError(false);

      setTimeout(() => {
        navigate('/available-equbs'); // Redirect after joining
      }, 2000);
    } catch (error) {
      setMessage('Error joining the equb');
      setIsError(true);
    }
  };

  if (!equb) {
    return <Typography variant="h6">Loading...</Typography>; // While fetching data
  }

  return (
    <Box sx={{ padding: 3 }}>
      {message && (
        <Alert severity={isError ? 'error' : 'success'}>{message}</Alert> // Show message
      )}
      <Card>
        <CardContent>
          <Typography variant="h4">{equb.name}</Typography>
          <Typography variant="body1">{equb.description}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={confirmJoinEqub} // Join the equb on confirm
          >
            Confirm To Join
          </Button> {/* Confirm join button */}
        </CardContent>
      </Card>
    </Box>
  );
};

export default JoinEqub;
