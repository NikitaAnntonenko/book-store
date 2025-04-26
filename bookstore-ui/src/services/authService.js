import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api/auth/';

export const register = async (username, email, password) => {
    const response = await axios.post(API_URL + 'register', {
        username,
        email,
        password
    });
    return response.data;
};

export const login = async (username, password) => {
    const response = await axios.post(API_URL + 'login', { username, password });
    if (response.data.token) {
        localStorage.setItem('jwt', response.data.token);
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('jwt');
};

export const getCurrentToken = () => {
    return localStorage.getItem('jwt');
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('jwt');
};

export const googleLogin = async (googleToken) => {
    const response = await axios.post(API_URL + 'google', { token: googleToken });
    if (response.data.token) {
        localStorage.setItem('jwt', response.data.token);
    }
    return response.data;
};

export const getUserRole = () => {
    const token = localStorage.getItem('jwt');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.role || null;
    } catch (error) {
        console.error('Invalid JWT Token', error);
        return null;
    }
};
