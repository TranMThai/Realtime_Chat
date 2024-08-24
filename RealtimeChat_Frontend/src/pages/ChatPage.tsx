import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Grid,
  IconButton,
} from '@mui/material';

interface Message {
  sender: string;
  content: string;
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const user = 'User1'; // Giả sử đây là người dùng hiện tại

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { sender: user, content: message }]);
      setMessage(''); // Xóa nội dung sau khi gửi
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="98vh"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={5}
        sx={{
          width: '100%',
          maxWidth: '1200px',
          padding: 3,
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
          }}
        >
          Chat Room
        </Typography>
        <List
          sx={{
            maxHeight: '400px',
            overflowY: 'auto',
            padding: 0,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{
                alignItems: 'flex-start',
                padding: '8px 16px',
                justifyContent: msg.sender === user ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.sender !== user && (
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#1976d2' }}>{msg.sender[0]}</Avatar>
                </ListItemAvatar>
              )}
              <Card
                sx={{
                  backgroundColor: msg.sender === user ? '#1976d2' : '#e0e0e0',
                  color: msg.sender === user ? '#ffffff' : '#000000',
                  maxWidth: '75%',
                  padding: 1,
                  borderRadius: 2,
                }}
              >
                <CardContent sx={{ padding: '8px !important' }}>
                  <Typography variant="body2">{msg.content}</Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <TextField
              label="Type a message"
              variant="outlined"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: 2,
              }}
            />
          </Grid>
          <Grid item>
            <IconButton
              color="primary"
              onClick={sendMessage}
              sx={{
                backgroundColor: '#1976d2',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ChatApp;
