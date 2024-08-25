import { Avatar, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/reducer/UserReducer';

const Sidebar: React.FC = () => {
    const user = useSelector(userSelector)
    const contacts = [
        { name: 'Nancy Fernandez', lastMessage: 'Hi Jordan!' },
        { name: 'Jonathan Griffin', lastMessage: 'Super! I will...' },
    ];

    return (
        <>
            <Typography variant='h5' m={3} my={1}>{user.name}</Typography>
            <List>
                {contacts.map((contact, index) => (
                    <ListItem button key={index}>
                        <Avatar
                            sx={{
                                mr: 1
                            }} />
                        <ListItemText primary={contact.name} secondary={`${contact.lastMessage}`} />
                    </ListItem>
                ))}
            </List>
        </>
    );
}

export default Sidebar;
