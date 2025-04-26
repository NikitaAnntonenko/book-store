import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            await register(username, email, password);
            setSuccess("Registration successful! You can now login.");
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError("Registration failed. Try again.");
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
            <Typography variant="h5" gutterBottom>Реєстрація</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Пароль" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
            <TextField label="Підтвердити пароль" type="password" fullWidth margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>Зареєструватись</Button>
            <Box sx={{ mt: 2 }}>
                <Link onClick={() => navigate('/login')}>Вже маєш акаунт? Увійти</Link>
            </Box>
        </Box>
    );
};

export default RegisterPage;
