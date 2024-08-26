import { Autocomplete, Avatar, Button, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import React, { SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { callCreateRoom, callFindAllByIdUser } from '../api/ChatRoomApi';
import { callFindAllUsersWithoutRoomWithIdUser } from '../api/UserApi';
import { userSelector } from '../redux/reducer/UserReducer';
import ChatRoom from '../types/ChatRoom';
import User from '../types/User';

interface IProps {
    setSelectedRoom: React.Dispatch<SetStateAction<number | string>>
}

const Sidebar: React.FC<IProps> = ({ setSelectedRoom }) => {
    const user = useSelector(userSelector)
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<number>(0)


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
        fetchFindAllByIdUser()
    }, [user])

    useEffect(() => {
        if (chatRooms.length > 0) {
            setSelectedRoom(chatRooms[0].id ?? 0)
        }
    }, [chatRooms])

    const handleChange = (_: React.SyntheticEvent, newValue: User | null) => {
        if (newValue) {
            setSelectedUser(newValue.id ?? 0)
        }
    };

    const handleAddRoom = async () => {
        const chatRoom: ChatRoom = { idUsers: [user.id ?? 0, selectedUser] }
        await callCreateRoom(chatRoom);
        await fetchFindAllByIdUser();
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
                        options={users}
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
                        <ListItemText primary={cr.nameReceiver} secondary={`Hello`} />
                    </ListItem>
                ))}

            </List>
        </>
    );
}

export default Sidebar;
