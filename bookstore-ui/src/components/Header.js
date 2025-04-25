import React from 'react';
import {AppBar, Toolbar, Typography, IconButton, Badge, Button, Link} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import {getUserRole, isAuthenticated, logout} from "../services/authService";

const Header = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const isAdmin = getUserRole() === 'ADMIN';

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    <Link to="/" style={{color: '#fff', textDecoration: 'none'}}>Book Shop</Link>
                </Typography>
                <Button color="inherit" onClick={() => navigate('/catalog')}>Catalog</Button>
                {isAuthenticated() && (
                    <>
                    {isAdmin && (<Button color="inherit" onClick={() => navigate('/admin')}>Admin Panel</Button>)}
                        <Button color="inherit" onClick={() => {
                            logout();
                            window.location.href = '/login';
                        }}>Logout</Button>

                    {!isAdmin && (<IconButton color="inherit" onClick={() => navigate('/cart')}>
                            <Badge badgeContent={totalQuantity} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>)}
                    </>
                )}
                {!isAuthenticated() && (
                    <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
