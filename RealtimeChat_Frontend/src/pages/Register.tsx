import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <Box
            sx={{
                width: 300,
                margin: '0 auto',
                mt: 8,
                padding: 4,
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
            }}
        >
            <Typography variant="h5" mb={2} textAlign="center">
                Register
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleRegister}
                sx={{ mt: 2 }}
            >
                Register
            </Button>
        </Box>
    );
};

export default Register;
