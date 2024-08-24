import { Avatar, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';

const Sidebar: React.FC = () => {
    const contacts = [
        { name: 'Nancy Fernandez', lastMessage: 'Hi Jordan!' },
        { name: 'Jonathan Griffin', lastMessage: 'Super! I will...' },
    ];

    return (
        <List>
            {contacts.map((contact, index) => (
                <ListItem button key={index}>
                    <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDbWRPBPM4LtL75LUJPlQ8GUriUF14c33j6g&s" />
                    <ListItemText primary={contact.name} secondary={`${contact.lastMessage}`} />
                </ListItem>
            ))}
        </List>
    );
}

export default Sidebar;
