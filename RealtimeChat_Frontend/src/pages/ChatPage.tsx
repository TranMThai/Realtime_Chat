import {
  Box,
  Grid
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callFindUserById } from '../api/UserApi';
import ChatArea from '../components/ChatArea';
import Sidebar from '../components/Sidebar';
import UserReducer from '../redux/reducer/UserReducer';
import { getToken } from '../services/TokenService';

const ChatApp: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      const getUser = async () => {
        try {
          const { user_id } = jwtDecode<{ user_id: string }>(token);
          const res = await callFindUserById(user_id);
          if (res && res.result) {
            dispatch(UserReducer.actions.setUser(res.result));
            console.log('chat page')
          } else {
            console.error('User not found');
          }
        } catch (error) {
          console.error('Error decoding token or fetching user:', error);
        }
      };
      getUser();
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

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
