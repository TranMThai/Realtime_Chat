import {
  Box,
  Grid
} from '@mui/material';
import React from 'react';
import ChatArea from '../components/ChatArea';
import Sidebar from '../components/Sidebar';

const ChatApp: React.FC = () => {

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <Grid container>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={9}>
          <ChatArea />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatApp;
