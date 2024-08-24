import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import MessageInput from './MessageInput';

const ChatArea: React.FC = () => {
    const messages = [
        { sender: 'Nancy Fernandez', text: "Hi Jordan! How are you?" },
        { sender: 'You', text: "Hi Nancy, I'm good! How about you?", isOwnMessage: true },
    ];

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
                        justifyContent={msg.isOwnMessage ? 'flex-end' : 'flex-start'}
                        sx={{ mb: 1 }}
                    >
                        {!msg.isOwnMessage &&
                            <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDbWRPBPM4LtL75LUJPlQ8GUriUF14c33j6g&s' />
                        }
                        <Paper
                            sx={{
                                p: 1.5,
                                m: 1,
                                backgroundColor: msg.isOwnMessage ? '#3A99D9' : '#C9E0F7',
                                color: msg.isOwnMessage ? '#fff' : '#000',
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
                    backgroundColor: '#f0f0f0',
                    p: 2,
                    boxSizing: 'border-box',
                }}
            >
                <MessageInput />
            </Box>
        </Box>
    );
}

export default ChatArea;
