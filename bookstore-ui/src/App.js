import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import RegisterPage from "./pages/RegisterPage";
import {isAuthenticated, logout} from "./services/authService";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Book Shop</Link>
                    </Typography>
                    {isAuthenticated() && (
                        <>
                            <Button color="inherit" component={Link} to="/admin">Admin Panel</Button>
                            <Button color="inherit" onClick={() => { logout(); window.location.href = '/login'; }}>Logout</Button>
                        </>
                    )}
                    {!isAuthenticated() && (
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                    )}
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin" element={
                        <PrivateRoute>
                            <AdminPage />
                        </PrivateRoute>
                    } />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;