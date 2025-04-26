import React, { useState } from 'react';
import {TextField, Button, Box, Typography, Alert, Link, Divider} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {googleLogin, login} from '../services/authService';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(username, password);
            navigate('/catalog');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        const googleToken = credentialResponse.credential;
        await googleLogin(googleToken);
        navigate('/catalog');
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
            <Typography variant="h5" gutterBottom>Увійти до Book Shop</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Пароль"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
                Увійти
            </Button>
            <Box sx={{ mt: 2 }}>
                <Link onClick={() => navigate('/register')}>Не маєш акаунту? Зареєструватись</Link>
            </Box>

            <Divider sx={{ my: 3 }}>АБО</Divider>

            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google login failed')}
                useOneTap
            />
        </Box>
    );
};

export default LoginPage;
