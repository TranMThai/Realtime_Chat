import { Avatar, Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/reducer/UserReducer';
import MessageInput from './MessageInput';
import Message from '../types/Message';
import SockJS from 'sockjs-client';
import api from '../constants/BaseUrl';
import { Client, IMessage } from '@stomp/stompjs';
import { getToken } from '../services/TokenService';

const ChatArea: React.FC = () => {

    const user = useSelector(userSelector)
    const [client, setClient] = useState<Client | null>(null);
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        const sock = new SockJS(`${api}/api/message`);

        const stompClient = new Client({
            webSocketFactory: () => sock as WebSocket,
            onConnect: () => {
                stompClient.subscribe('/topic/public', (message: IMessage) => {
                    setMessages(prevMessage => [
                        ...prevMessage,
                        JSON.parse(message.body)
                    ]);
                });
            },
            connectHeaders: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        stompClient.activate();
        setClient(stompClient);

        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, []);

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
                            justifyContent={msg.idSender == user.id ? 'flex-end' : 'flex-start'}
                            sx={{ mb: 1 }}
                        >
                            {!(msg.idSender == user.id) &&
                                <Avatar />
                            }
                            <Paper
                                sx={{
                                    p: 1.5,
                                    m: 1,
                                    backgroundColor: msg.idSender == user.id ? '#3A99D9' : '#C9E0F7',
                                    color: msg.idSender == user.id ? '#fff' : '#000',
                                    maxWidth: 750,
                                    wordBreak: 'break-word',
                                }}
                            >
                                <Typography variant="body2">
                                    {msg.content}
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
                    <MessageInput
                        client={client}
                    />
                </Box>
            </Box>
        );
}

export default ChatArea;
