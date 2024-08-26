import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { callAuthenticate } from '../api/AuthApi';
import { saveToken } from '../services/TokenService';
import User from '../types/User';

const Login: React.FC = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleLogin = async () => {
        try {
            const res = await callAuthenticate(user);
            saveToken(res.result.token);
            navigate('/chat');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    window.addEventListener('keypress', (e) => {
        if (e.key === 'Enter')
            handleLogin()
    })

    return (
        <Box
            sx={{
                maxWidth: 500,
                margin: '0 auto',
                mt: 8,
                padding: 4,
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
            }}
        >
            <Typography variant="h5" mb={2} textAlign="center">
                Login
            </Typography>
            <TextField
                label="Username"
                name="username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={user.username}
                onChange={handleChange}
            />
            <TextField
                label="Password"
                name="password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={user.password}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
                sx={{ my: 3 }}
            >
                Login
            </Button>
            <Box
                mb={1}
            >
                <Link to='/register'>
                    <Typography
                        sx={{
                            color: 'blue',
                            float: 'right'
                        }}
                    >
                        Don't have account?
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
};

export default Login;
