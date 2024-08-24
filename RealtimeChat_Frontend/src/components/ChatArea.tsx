import { Avatar, Box, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/reducer/UserReducer';
import MessageInput from './MessageInput';

const ChatArea: React.FC = () => {

    const user = useSelector(userSelector)

    const messages = [
        { sender: 3, text: "Hi Jordan! How are you?" },
        { sender: 2, text: "Hi Nancy, I'm good! How about you?" },
    ];

    console.log(user)

    if (user)
        return (
            <Box
                sx={{
                    p: 2,
                    pb: 0,
                    position: 'relative',
                    height: '100vh',
                    boxSizing: 'border-box',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        pr: 2,
                    }}
                >
                    {messages.map((msg, index) => (
                        <Box
                            key={index}
                            display="flex"
                            justifyContent={msg.sender == user.id ? 'flex-end' : 'flex-start'}
                            sx={{ mb: 1 }}
                        >
                            {!(msg.sender == user.id) &&
                                <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDbWRPBPM4LtL75LUJPlQ8GUriUF14c33j6g&s' />
                            }
                            <Paper
                                sx={{
                                    p: 1.5,
                                    m: 1,
                                    backgroundColor: msg.sender == user.id ? '#3A99D9' : '#C9E0F7',
                                    color: msg.sender == user.id ? '#fff' : '#000',
                                    maxWidth: 750,
                                    wordBreak: 'break-word',
                                }}
                            >
                                <Typography variant="body2">
                                    {msg.text}
                                </Typography>
                            </Paper>
                        </Box>
                    ))}
                </Box>

                <Box
                    sx={{
                        position: 'sticky',
                        bottom: 0,
                        width: '100%',
                        p: 1,
                        boxSizing: 'border-box',
                    }}
                >
                    <MessageInput />
                </Box>
            </Box>
        );
}

export default ChatArea;
