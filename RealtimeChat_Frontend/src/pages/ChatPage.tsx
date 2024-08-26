import {
  Box,
  Grid
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callFindUserById } from '../api/UserApi';
import Sidebar from '../components/Sidebar';
import UserReducer, { userSelector } from '../redux/reducer/UserReducer';
import { getToken } from '../services/TokenService';
import ChatArea from '../components/ChatArea';

const ChatApp: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const [selectedRoom, setSelectedRoom] = useState<number|string>(0)

  useEffect(() => {
    const token = getToken();
    if (token) {
      const getUser = async () => {
        try {
          const { user_id } = jwtDecode<{ user_id: string }>(token);
          const res = await callFindUserById(user_id);
          if (res && res.result) {
            dispatch(UserReducer.actions.setUser(res.result));
          } else {
            console.error('User not found');
            navigate('/login');
          }
        } catch (error) {
          console.error('Error decoding token or fetching user:', error);
          navigate('/login');
        }
      };
      getUser();
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  if (user) {
    return (
      <Box sx={{ height: '100vh', display: 'flex' }}>
        <Grid container>
          <Grid item xs={3}>
            <Sidebar 
            setSelectedRoom={setSelectedRoom}
            />
          </Grid>
          <Grid item xs={9}>
            <ChatArea
            selectedRoom={selectedRoom}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
};

export default ChatApp;
