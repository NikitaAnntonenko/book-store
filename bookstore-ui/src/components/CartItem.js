import React from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCart();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <img src={item.imageUrl} alt={item.title} width="80" />
            <Box sx={{ ml: 2, flexGrow: 1 }}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2">by {item.author}</Typography>
                <Typography variant="subtitle1">{item.price} ₴</Typography>
            </Box>
            <TextField
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                sx={{ width: 60, mr: 2 }}
                inputProps={{ min: 1 }}
            />
            <IconButton onClick={() => removeFromCart(item.id)}>
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};

export default CartItem;
