import React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Card, CardContent, CardActionArea, Typography } from '@mui/material';
import {
  Groups as MyEqubIcon,
  Forum as CustomerForumIcon,
  Celebration as HolidayLotteryIcon,
  Chat as LiveChatSupportIcon,
  Payment as PaymentIcon,
  Casino as DrawIcon, // New icon for the "Draw" card
  HelpOutline as FaqIcon,
} from '@mui/icons-material';

const DashboardContent = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route); // Navigate to the specified route
  };

  const cardStyles = {
    '&:hover': {
      boxShadow: 6,
      backgroundColor: '#e0f7fa', // Light teal on hover
    },
    transition: '0.3s', // Smooth transition for hover effects
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <CardActionArea onClick={() => handleCardClick('/myequb')}>
          <Card sx={cardStyles}>
            <CardContent>
              <MyEqubIcon fontSize="large" sx={{ color: '#1e88e5' }} /> {/* Blue */}
              <Typography variant="subtitle1" sx={{ color: '#1e88e5' }}>My Equb</Typography> {/* Blue */}
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <CardActionArea onClick={() => handleCardClick('/customerforum')}>
          <Card sx={cardStyles}>
            <CardContent>
              <CustomerForumIcon fontSize="large" sx={{ color: '#f4511e' }} /> {/* Orange */}
              <Typography variant="subtitle1" sx={{ color: '#f4511e' }}>Customer Forum</Typography> {/* Orange */}
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <CardActionArea onClick={() => handleCardClick('/holidaylottery')}>
          <Card sx={cardStyles}>
            <CardContent>
              <HolidayLotteryIcon fontSize="large" sx={{ color: '#7b1fa2' }} /> {/* Purple */}
              <Typography variant="subtitle1" sx={{ color: '#7b1fa2' }}>Holiday Lottery</Typography> {/* Purple */}
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <CardActionArea onClick={() => handleCardClick('/livechatsupport')}>
          <Card sx={cardStyles}>
            <CardContent>
              <LiveChatSupportIcon fontSize="large" sx={{ color: '#388e3c' }} /> {/* Green */}
              <Typography variant="subtitle1" sx={{ color: '#388e3c' }}>Live Chat Support</Typography> {/* Green */}
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>

<Grid item xs={12} sm={6} md={4}>
  <CardActionArea onClick={() => handleCardClick('/chat')}>
    <Card sx={cardStyles}>
      <CardContent>
        <LiveChatSupportIcon fontSize="large" sx={{ color: '#388e3c' }} /> {/* Green */}
        <Typography variant="subtitle1" sx={{ color: '#388e3c' }}>Group Chat</Typography> {/* Green */}
      </CardContent>
    </Card>
  </CardActionArea>
</Grid>

      <Grid item xs={12} sm={6} md={4}>
        <CardActionArea onClick={() => handleCardClick('/payment')}>
          <Card sx={{ ...cardStyles, '&:hover': { backgroundColor: '#b2dfdb' } }}> {/* Light teal */}
            <CardContent>
              <PaymentIcon fontSize="large" sx={{ color: '#009688' }} /> {/* Teal */}
              <Typography variant="subtitle1" sx={{ color: '#009688' }}>Payment</Typography> {/* Teal */}
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <CardActionArea onClick={() => handleCardClick('/user-created-equbs')}>
          <Card sx={{ ...cardStyles, '&:hover': { backgroundColor: '#ffebee' } }}> {/* Light pink */}
            <CardContent>
              <DrawIcon fontSize="large" sx={{ color: '#d32f2f' }} /> {/* Red */}
              <Typography variant="subtitle1" sx={{ color: '#d32f2f' }}>Draw</Typography> {/* Red */}
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <CardActionArea onClick={() => handleCardClick('/faq')}>
          <Card sx={cardStyles}>
            <CardContent>
              <FaqIcon fontSize="large" sx={{ color: '#ff5722' }} /> {/* Deep Orange */}
              <Typography variant="subtitle1" sx={{ color: '#ff5722' }}>FAQ</Typography> {/* Deep Orange */}
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
    </Grid>
  );
};

export default DashboardContent;
