import { Avatar, Box, Paper, Typography } from '@mui/material';
import { Client, IMessage } from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import { callFindAllMessageByIdRoom, callSeenAllByIdRoom } from '../api/ChatRoomApi';
import { socketChatApi } from '../constants/BaseUrl';
import { userSelector } from '../redux/reducer/UserReducer';
import { getToken } from '../services/TokenService';
import Message from '../types/Message';
import MessageInput from './MessageInput';

interface IProps {
    selectedRoom: number
}

const ChatArea: React.FC<IProps> = ({ selectedRoom }) => {

    const user = useSelector(userSelector)
    const [client, setClient] = useState<Client | null>(null);
    const [messages, setMessages] = useState<Message[]>([])
    const chatBoxRef = useRef<HTMLElement>(null);

    const fetchAllMessageByIdRoom = async () => {
        if (selectedRoom != 0) {
            const { result } = await callFindAllMessageByIdRoom(selectedRoom + "")
            setMessages([...result])
        }
    }

    const seenAll = async () => {
        try {
            await callSeenAllByIdRoom(selectedRoom, user.id + '');
        } catch (error) {
            console.error("Error marking messages as seen:", error);
        }
    };
    
    useEffect(() => {
        if (selectedRoom > 0) {

            fetchAllMessageByIdRoom()

            const sock = new SockJS(socketChatApi);
            const stompClient = new Client({
                webSocketFactory: () => sock as WebSocket,
                onConnect: () => {
                    stompClient.subscribe(`/room/${selectedRoom}`, (message: IMessage) => {
                        setMessages(prevMessage => [
                            ...prevMessage,
                            JSON.parse(message.body)
                        ])
                    },
                        {
                            idRoom: selectedRoom + "",
                            token: getToken() + ""
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
            }
        }
    }, [selectedRoom, user]);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
        if (selectedRoom > 0) {
            seenAll()
        }
    }, [messages])


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
                    ref={chatBoxRef}
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
                        selectedRoom={selectedRoom}
                    />
                </Box>
            </Box>
        );
}

export default ChatArea;
