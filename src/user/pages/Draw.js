import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const NameItem = styled('li')({
  marginBottom: '8px',
  color: '#3f51b5', // Blue color for names
});

const WinnerText = styled(Typography)({
  color: '#4caf50', // Green color for winner text
});

const BlurBackground = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 999,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Draw = () => {
  const { equbId } = useParams();
  const [eligibleMembers, setEligibleMembers] = useState([]);
  const [winner, setWinner] = useState(null);
  const [drawing, setDrawing] = useState(false); // State to control drawing state
  const [showWinnerModal, setShowWinnerModal] = useState(false); // State to control winner modal

  useEffect(() => {
    const fetchEligibleMembers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authorization token not found');
        }

        const response = await axios.get(`http://localhost:5000/api/equb-draws/eligible-members/${equbId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEligibleMembers(response.data.eligibleMembers);
      } catch (error) {
        console.error('Error fetching eligible members:', error);
      }
    };

    fetchEligibleMembers();
  }, [equbId]);

  const handleDraw = async (e) => {
    e.preventDefault(e);
    try {
      setDrawing(true); // Start drawing

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authorization token not found');
      }

      const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
      const winner = eligibleMembers[randomIndex];
      setWinner(winner);

      // Simulate delay of 3 seconds before showing winner
      setTimeout(() => {
        setDrawing(false); // Stop drawing
        setShowWinnerModal(true); // Show winner modal
      }, 3000);

      // Store draw result
      const response = await axios.post('http://localhost:5000/api/equb-draws/store-draw', {
        equbId,
        winnerId: winner._id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        console.log('Draw result stored successfully!');
      } else {
        console.error('Error storing draw result:', response.data);
      }
    } catch (error) {
      console.error('Error drawing:', error);
    }
  };

  const handleOK = async () => {
    setShowWinnerModal(false);
  };

  return (
    <div>
      <Typography variant="h6">Eligible Members For This Round Are:</Typography>
      <ul>
        {eligibleMembers.map((member, index) => (
          <NameItem key={index}>{member.fname} {member.lname}</NameItem>
        ))}
      </ul>
      <Button variant="contained" onClick={handleDraw} sx={{ mt: 2 }}>Draw!</Button>
      {drawing && <Typography variant="body1" sx={{ mt: 2 }}>Drawing...</Typography>}
      {showWinnerModal && (
        <BlurBackground>
          <div>
            <WinnerText variant="h6">Winner: {winner.fname} {winner.lname}</WinnerText>
            <Typography variant="body1" sx={{ color: '#4caf50', fontWeight: 'bold' }}>Success!</Typography>
            <Button variant="contained" onClick={handleOK} sx={{ mt: 2 }}>OK</Button>
          </div>
        </BlurBackground>
      )}
    </div>
  );
};

export default Draw;