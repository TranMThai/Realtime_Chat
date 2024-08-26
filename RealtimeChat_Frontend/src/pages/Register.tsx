import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { callCreateUser } from '../api/UserApi';
import User from '../types/User';
import { Link, useNavigate } from 'react-router-dom';

interface IConfirmPassword {
    confirmPassword: string
}

const Register: React.FC = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<User & IConfirmPassword>({
        name: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleRegister = () => {
        if (user.password == user.confirmPassword) {
            callCreateUser(user)
            navigate('/login')
        }
    };

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
                Register
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
            <TextField
                label="Confirm Password"
                name='confirmPassword'
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={user.confirmPassword}
                onChange={handleChange}
            />
            <TextField
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={user.name}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleRegister}
                sx={{ my: 3 }}
            >
                Register
            </Button>
            <Box
                mb={2}
            >
                <Link to='/login'>
                    <Typography
                        sx={{
                            color: 'blue',
                            float: 'right'
                        }}
                    >
                        Already have account?
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
};

export default Register;
