import { Box, Button, TextField } from '@mui/material';

const MessageInput: React.FC = () => {
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
                sx={{
                    mr: 3
                }}
            />
            <Button
                color="primary"
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
