import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const drawerWidth = 240;
const navItems = ['Home', 'How It Works', 'Features', 'Sign Up', 'Login'];

const OuterHome = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const homeRef = useRef(null);
  const howItWorksRef = useRef(null);
  const featuresRef = useRef(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavItemClick = (item) => {
    switch (item) {
      case 'Home':
        homeRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'How It Works':
        howItWorksRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Features':
        featuresRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Sign Up':
        navigate('/signup');
        break;
      case 'Login':
        navigate('/login');
        break;
      default:
        break;
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Digital Equb
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => handleNavItemClick(item)}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Digital Equb
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: '#fff' }}
                onClick={() => handleNavItemClick(item)}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
        <Toolbar />

        {/* Home section */}
        <Box
    ref={homeRef}
    sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <Typography variant="h4" sx={{ mb: 2 }}>
      Welcome to Digital Equb!
    </Typography>
    <Typography variant="body1" sx={{ mb: 2 }}>
      Join a modernized version of traditional equbs. Create, join, or manage equbs with ease.
    </Typography>
    <Typography variant="body2" sx={{ mb: 2 }}>
      Discover the power of collaborative savings and financial empowerment.
    </Typography>
    <Typography variant="body2">
      Start your journey today and unlock a world of possibilities.
    </Typography>
  </Box>

        {/* How It Works section */}
        <Box ref={howItWorksRef} sx={{ mt: 5, height: '100vh' }}>
          <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3 }}>
            How It Works
          </Typography>
          <Paper sx={{ padding: 3, margin: 'auto', maxWidth: 800 }}>
            {/* Step-by-step explanation */}
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.5em', marginBottom: 2 }}>
              Step 1: Create or Join an Equb
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>
              Create your own equb and invite others to join, or search for existing equbs to participate in.
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Typography sx={{ fontWeight: 'bold', fontSize: '1.5em', marginBottom: 2 }}>
              Step 2: Contribute Regularly
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>
              Contribute the agreed-upon amount at regular intervals. Contributions are collected into a common pool.
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Typography sx={{ fontWeight: 'bold', fontSize: '1.5em', marginBottom: 2 }}>
              Step 3: Take Turns Receiving the Pool
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>
              Based on a predetermined schedule, members take turns receiving the entire pool. This continues until everyone has received their share.
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Typography sx={{ fontWeight: 'bold', fontSize: '1.5em', marginBottom: 2 }}>
              Step 4: Complete the Cycle
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>
              Once the cycle is complete, you can start a new equb or continue with the existing group for another round.
            </Typography>
          </Paper>
        </Box>

        {/* Features section */}
        <Box ref={featuresRef} sx={{ mt: 5, height: '100vh' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3 }}>
        Features
      </Typography>

      <Paper sx={{ padding: 3, maxWidth: 1000, margin: 'auto' }}>
        <Typography
          variant="h6"
          sx={{ color: '#4CAF50', fontWeight: 'bold' }}
        >
          Secure Transactions
        </Typography>
        <Typography variant="body1">
          Our platform uses advanced encryption to ensure that all transactions are secure and your data is protected.
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Typography
          variant="h6"
          sx={{ color: '#2196F3', fontWeight: 'bold' }}
        >
          Easy Equb Management
        </Typography>
        <Typography variant="body1">
          Manage your equbs with ease through an intuitive interface. Create, edit, or delete equbs with just a few clicks.
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Typography
          variant="h6"
          sx={{ color: '#FF9800', fontWeight: 'bold' }}
        >
          Transparent Records
        </Typography>
        <Typography variant="body1">
          View all contributions and payouts in real-time. Our system keeps detailed records to ensure complete transparency.
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Typography
          variant="h6"
          sx={{ color: '#9C27B0', fontWeight: 'bold' }}
        >
          Customizable Equbs
        </Typography>
        <Typography variant="body1">
          Create equbs tailored to your needs. Adjust frequency, contribution amounts, and more to fit your preferences.
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Typography
          variant="h6"
          sx={{ color: '#F44336', fontWeight: 'bold' }}
        >
          Live Chat Support
        </Typography>
        <Typography variant="body1">
          Get instant help with our live chat support. Our team is ready to assist you with any questions or issues you may have.
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Typography
          variant="h6"
          sx={{ color: '#3F51B5', fontWeight: 'bold' }}
        >
          Tickets Support
        </Typography>
        <Typography variant="body1">
          Submit support tickets for more complex issues. Our team will respond quickly to resolve any problems.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Button variant="contained" color="primary" onClick={() => navigate('/signup')}>
            Let us get started
          </Button>
      </Paper>
        </Box>
      </Box>

      {/* Footer section */}
      <Box sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          &copy; 2024 Digital Equb. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Contact: info@digitalequb.com | Terms of Service | Privacy Policy
        </Typography>
      </Box>
    </Box>
  );
};

export default OuterHome;
