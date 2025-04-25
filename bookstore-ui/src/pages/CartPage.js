import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const CartPage = () => {
    const { cartItems, clearCart } = useCart();

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Box sx={{ mt: 4, px: 2 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Your Cart</Typography>

            {cartItems.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
            ) : (
                <>
                    {cartItems.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}

                    <Typography variant="h6" sx={{ mt: 3 }}>Total: {total.toFixed(2)} ₴</Typography>

                    <Button variant="contained" sx={{ mt: 2, mr: 2 }}>Checkout</Button>
                    <Button variant="outlined" sx={{ mt: 2 }} onClick={clearCart}>Clear Cart</Button>
                </>
            )}
        </Box>
    );
};

export default CartPage;
