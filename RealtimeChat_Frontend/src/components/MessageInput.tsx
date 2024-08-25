import { Box, Button, TextField } from '@mui/material';
import { Client } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/reducer/UserReducer';
import { useState } from 'react';

interface IProps {
    client: Client | null
}

const MessageInput: React.FC<IProps> = ({client}) => {

    const user = useSelector(userSelector)
    const [content, setContent] = useState<string>('')

    const handleSend = () => {
        if(client && client.connected && content.trim().length>0){
            client.publish({
                destination: '/app/chat.public',
                body: JSON.stringify({
                    type: 'CHAT',
                    content: content,
                    idSender: user.id
                })
            })
            setContent('')
        }
    }

    return (
        <Box display="flex" sx={{
            p: 2,
            borderTop: '1px solid #ccc',
            backgroundColor: 'white'
        }}>
            <TextField
                variant="outlined"
                placeholder="Write your message..."
                fullWidth
                value={content}
                sx={{
                    mr: 3
                }}
                onChange={(e)=>setContent(e.target.value)}
            />
            <Button
                color="primary"
                onClick={handleSend}
            >
                <i className="fa-solid fa-paper-plane"
                    style={{
                        fontSize: 30
                    }} />
            </Button>
        </Box>
    );
}

export default MessageInput;
