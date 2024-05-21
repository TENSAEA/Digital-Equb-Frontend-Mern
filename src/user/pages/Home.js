import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Corrected import
import Sidebar from '../components/Sidebar';
import Box from '@mui/material/Box';
import DashboardContent from './DashboardContent'; // Import your Dashboard content component
import MyEqub from './MyEqub'; // Import other components
import CustomerForum from './CustomerForum'; // Add more as needed
import HolidayLottery from './HolidayLottery'; // ...
import LiveChatSupport from './LiveChatSupport';
import Payment from './Payment';
import Faq from './Faq';
import AvailableEqubs from '../components/AvailableEqubs';
import EqubDetails from '../components/EqubDetails'; // Importing EqubDetails
import JoinEqub from '../components/JoinEqub'; // Importing JoinEqub
import Draw from './Draw';
import UserCreatedEqubs from './UserCreatedEqubs';
import Invite from '../components/Invite';
import Notification from './Notification';
import Chat from './Chat';

const Home = () => {
  const { auth, clearAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/home',
          {
            headers: {
              Authorization: `Bearer ${auth.token}`, // Pass the JWT token
            },
          }
        );
      } catch (error) {
        clearAuthData(); // Clear authentication data on unauthorized access
        navigate('/login'); // Redirect to login if unauthorized
      }
    };

    fetchHomeData(); // Fetch data when the component mounts
  }, [auth.token, navigate, clearAuthData]);

  return (
    <div>
      <Sidebar user={auth.user} />
      <Box component="main" sx={{ flexGrow: 1, padding: 3, ml: 30 }}>
        <Routes> {/* Define the routes for each component */}
          <Route path="/home" element={<DashboardContent />} /> {/* Dashboard */}
          <Route path="/myequb" element={<MyEqub />} /> {/* My Equb */}
        <Route path="/available-equbs" element={<AvailableEqubs />} /> {/* Route for available equbs */}
        <Route path="/equb-details/:id" element={<EqubDetails />} /> {/* Route for equb details */}
        <Route path="/join-equb/:id" element={<JoinEqub />} /> {/* Route for joining equb */}
          <Route path="/customerforum" element={<CustomerForum />} /> {/* Customer Forum */}
          <Route path="/holidaylottery" element={<HolidayLottery />} /> {/* Holiday Lottery */}
          <Route path="/livechatsupport" element={<LiveChatSupport />} /> {/* Live Chat Support */}
          <Route path="/payment" element={<Payment />} /> {/* Payment */}
          <Route path="/user-created-equbs" element={<UserCreatedEqubs />} /> {/* Correct path */}
          <Route path="/draw/:equbId" element={<Draw />} /> {/* Draw */}
          <Route path="/faq" element={<Faq />} /> {/* FAQ */}
          <Route path="/invite/:equbId" element={<Invite inviter={auth.user} />} /> {/* invite members to join the equb */}
          <Route path="/notifications" element={<Notification />} />
          <Route path="/chat" element={<Chat sender={auth.user} />} />
        </Routes>
      </Box>
    </div>
  );
};

export default Home;
