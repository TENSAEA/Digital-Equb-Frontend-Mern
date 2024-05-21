import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  IconButton,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';

const Chat = ({ sender }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/search-all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    axios.get(`http://localhost:5000/api/chat/${sender._id}/${user._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setChatHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching chat history:', error);
      });
  };

  const handleSendMessage = () => {
    axios.post('http://localhost:5000/api/chat/create', {
      senderId: sender._id,
      receiverId: selectedUser._id,
      message: message,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setChatHistory([...chatHistory, response.data]);
        setMessage('');
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Left panel - User list */}
      <Paper style={{ flex: '0 0 40%', height: '100%', overflowY: 'auto' }}>
        <Typography variant="h5" style={{ padding: '1rem' }}>Users</Typography>
        <TextField
          placeholder="Search users"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: '1rem', marginLeft: '1rem', marginRight: '1rem' }}
        />
        <List>
          {users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase())).map(user => (
            <ListItem button key={user._id} onClick={() => handleUserSelect(user)}>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Divider */}
      <Divider orientation="vertical" flexItem />

      {/* Right panel - Chat area */}
      <Paper style={{ flex: '1', height: '100%', padding: '1rem', overflowY: 'auto', maxWidth: '60%' }}>
        <Typography variant="h5">{selectedUser ? selectedUser.name : 'Select a user to start chatting'}</Typography>
        <List style={{ marginTop: '1rem' }}>
          {chatHistory.map(chat => (
            <ListItem key={chat._id} style={{ textAlign: chat.senderId === sender._id ? 'right' : 'left' }}>
              <ListItemText secondary={chat.message} />
            </ListItem>
          ))}
        </List>
        <TextField
          placeholder="Type a message..."
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSendMessage}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          style={{ marginTop: '1rem' }}
        />
      </Paper>
    </div>
  );
};

export default Chat;
