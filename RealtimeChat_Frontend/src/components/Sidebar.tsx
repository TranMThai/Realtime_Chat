import { Avatar, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/reducer/UserReducer';
import ChatRoom from '../types/ChatRoom';
import { callFindAllByIdUser } from '../api/ChatRoomApi';

interface IProps {
    setSelectedRoom: React.Dispatch<SetStateAction<number | string>>
}

const Sidebar: React.FC<IProps> = ({ setSelectedRoom }) => {
    const user = useSelector(userSelector)
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])

    useEffect(() => {
        const fetch = async () => {
            const { result } = await callFindAllByIdUser(user.id + "")
            setChatRooms([...result])
        }
        fetch()
    }, [user])

    useEffect(() => {
        if (chatRooms.length > 0){   
            setSelectedRoom(chatRooms[0].id)
        }
    }, [chatRooms])

    return (
        <>
            <Typography variant='h5' m={3} my={1}>{user.name}</Typography>
            <List>
                {chatRooms.map(cr => (
                    <ListItem button key={cr.id}
                        onClick={() => setSelectedRoom(cr.id)}
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
