import { Autocomplete, Avatar, Box, Button, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { Client, IMessage } from '@stomp/stompjs';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import { callCreateRoom, callFindAllByIdUser } from '../api/ChatRoomApi';
import { callFindAllUsersWithoutRoomWithIdUser } from '../api/UserApi';
import { socketChatApi } from '../constants/BaseUrl';
import { userSelector } from '../redux/reducer/UserReducer';
import { getToken } from '../services/TokenService';
import ChatRoom from '../types/ChatRoom';
import User from '../types/User';

interface IProps {
    setSelectedRoom: React.Dispatch<SetStateAction<number>>
}

const Sidebar: React.FC<IProps> = ({ setSelectedRoom }) => {
    const user = useSelector(userSelector)
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<number>(0)
    const autocompleteRef = useRef<HTMLInputElement>(null);


    const fetchFindAllUsersWithoutRoomWithIdUser = async () => {
        const { result } = await callFindAllUsersWithoutRoomWithIdUser(user.id + "")
        setUsers([...result])
    }
    const fetchFindAllByIdUser = async () => {
        const { result } = await callFindAllByIdUser(user.id + "")
        setChatRooms([...result])
    }

    useEffect(() => {
        fetchFindAllUsersWithoutRoomWithIdUser()

        const sock = SockJS(`${socketChatApi}`)
        const stompClient = new Client({
            webSocketFactory: () => sock as WebSocket,
            onConnect: () => {
                fetchFindAllUsersWithoutRoomWithIdUser()
                fetchFindAllByIdUser()
                console.log("hello")
                stompClient.subscribe(`/user/${user.id}`, (chatRooms: IMessage) => {
                    setChatRooms([...JSON.parse(chatRooms.body)]);
                },
                    {
                        idUser: user.id + "",
                        token: getToken() + ""
                    }
                )
            },
            connectHeaders: {
                Authorization: `Bearer ${getToken()}`
            },
            debug: (string) => {
                console.log(string)
            }
        })

        stompClient.activate()

        return () => {
            if (stompClient) {
                stompClient.deactivate()
            }
        }

    }, [user])

    const handleChange = (_: React.SyntheticEvent, newValue: User | null) => {
        if (newValue) {
            setSelectedUser(newValue.id ?? 0)
        }
    };

    const handleAddRoom = async () => {
        if (autocompleteRef.current) {
            autocompleteRef.current.value = "";
        }
        const chatRoom: ChatRoom = { idUsers: [user.id ?? 0, selectedUser] }
        await callCreateRoom(chatRoom);
        await fetchFindAllUsersWithoutRoomWithIdUser();
    };

    return (
        <>
            <List sx={{ px: 2 }}>
                <Typography variant='h5' m={3} my={1}>{user.name}</Typography>
                <ListItem
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Autocomplete
                        disablePortal
                        size='small'
                        value={null}
                        options={users}
                        ref={autocompleteRef}
                        getOptionLabel={option => option.name + ""}
                        getOptionKey={option => option.id ?? -1}
                        sx={{ width: 300, mr: 2 }}
                        renderInput={(params) => <TextField {...params} label="User" />}
                        onChange={handleChange}
                    />
                    <Button variant='contained'
                        onClick={handleAddRoom}
                    >Thêm</Button>
                </ListItem>
                {chatRooms.map(cr => (
                    <ListItem button key={cr.id}
                        onClick={() => setSelectedRoom(cr.id ?? 0)}
                    >
                        <Avatar
                            sx={{
                                mr: 1
                            }} />
                        <ListItemText primary={cr.nameReceiver} secondary={cr.lastMessage}
                            sx={{
                                overflow: 'hidden',
                                textWrap: 'nowrap'
                            }} />
                        {
                            ((cr.unseenMessageCount ?? 0) > 0 && cr.idLastSender != user.id) &&
                            <Box
                                sx={{
                                    position: 'absolute',
                                    left: 40,
                                    top: 10,
                                    backgroundColor: 'red',
                                    color: 'white',
                                    borderRadius: '50%',
                                    fontSize: '14px',
                                    width: 20,
                                    height: 20,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {(cr.unseenMessageCount ?? 0) > 9 ? "9+" : cr.unseenMessageCount}
                            </Box>
                        }
                    </ListItem>
                ))}

            </List>
        </>
    );
}

export default Sidebar;
